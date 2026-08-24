import { createClient, isSupabaseConfigured } from './client'
import { PreloadedTrip, UserProfile } from '@/types'

/**
 * Sign up a new user with email, password, and profile metadata.
 */
export async function signUpUser(email: string, password: string, name: string, dietary = 'pureVeg', homeState = 'Gujarat') {
  const supabase = createClient()
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase is not configured yet. Please check .env.local')
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        dietary_preference: dietary,
        home_state: homeState,
      },
    },
  })

  if (error) throw error

  // Supabase returns an empty identities array if the user already exists (to prevent enumeration)
  if (data.user && data.user.identities && data.user.identities.length === 0) {
    throw new Error('An account with this email already exists. Please switch to Sign In or reset password.')
  }

  return {
    ...data,
    needsEmailConfirmation: !data.session,
  }
}

/**
 * Sign in existing user with email and password.
 */
export async function signInUser(email: string, password: string) {
  const supabase = createClient()
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase is not configured yet. Please check .env.local')
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

/**
 * Sign out current user.
 */
export async function signOutUser() {
  const supabase = createClient()
  if (!isSupabaseConfigured() || !supabase) return

  await supabase.auth.signOut()
}

/**
 * Get current authenticated user session and profile.
 */
export async function getCurrentUserProfile(): Promise<{ user: any; profile: UserProfile | null }> {
  const supabase = createClient()
  if (!isSupabaseConfigured() || !supabase) {
    return { user: null, profile: null }
  }

  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { user: null, profile: null }

    const { data: profileRow } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    const trips = await fetchUserSavedTrips(user.id)

    return {
      user,
      profile: {
        name: profileRow?.name || user.user_metadata?.name || user.email?.split('@')[0] || 'Traveler',
        dietary: (profileRow?.dietary_preference as any) || 'pureVeg',
        homeState: profileRow?.home_state || 'Gujarat',
        savedTrips: trips,
      },
    }
  } catch (err) {
    console.warn('Error fetching profile from Supabase:', err)
    return { user: null, profile: null }
  }
}

/**
 * Update user profile preferences in Supabase.
 */
export async function updateUserProfile(profile: Partial<UserProfile>, userId?: string) {
  const supabase = createClient()
  if (!isSupabaseConfigured() || !supabase) return

  try {
    const uid = userId || (await supabase.auth.getUser()).data.user?.id
    if (!uid) return

    await supabase.from('user_profiles').upsert({
      id: uid,
      name: profile.name,
      dietary_preference: profile.dietary,
      home_state: profile.homeState,
    })
  } catch (err) {
    console.warn('Error updating Supabase profile:', err)
  }
}

/**
 * Fetch all saved trips for the authenticated user from Supabase.
 */
export async function fetchUserSavedTrips(userId?: string): Promise<PreloadedTrip[]> {
  const supabase = createClient()
  if (!isSupabaseConfigured() || !supabase) return []

  try {
    const uid = userId || (await supabase.auth.getUser()).data.user?.id
    if (!uid) return []

    const { data, error } = await supabase
      .from('saved_trips')
      .select('*')
      .eq('user_id', uid)
      .order('created_at', { ascending: false })

    if (error || !data) return []

    return data.map((row) => {
      const trip = row.trip_data as unknown as PreloadedTrip
      return {
        ...trip,
        id: row.id,
        title: row.title || trip.title,
      }
    })
  } catch (err) {
    console.warn('Error loading trips from Supabase:', err)
    return []
  }
}

/**
 * Save / Upsert a trip into Supabase cloud.
 */
export async function saveTripToCloud(trip: PreloadedTrip): Promise<boolean> {
  const supabase = createClient()
  if (!isSupabaseConfigured() || !supabase) return false

  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    const tripId = trip.id || `trip-${Date.now()}`

    const { error } = await supabase
      .from('saved_trips')
      .upsert({
        id: tripId,
        user_id: user.id,
        title: trip.title,
        region: trip.region || null,
        category: trip.category || null,
        duration_days: trip.duration || trip.itinerary?.length || 3,
        trip_data: trip as any,
      })

    if (error) {
      console.warn('Failed to save trip to Supabase:', error)
      return false
    }
    return true
  } catch (err) {
    console.warn('Exception saving trip to Supabase:', err)
    return false
  }
}

/**
 * Delete a trip from Supabase cloud.
 */
export async function deleteTripFromCloud(tripId: string): Promise<boolean> {
  const supabase = createClient()
  if (!isSupabaseConfigured() || !supabase) return false

  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    const { error } = await supabase
      .from('saved_trips')
      .delete()
      .eq('id', tripId)
      .eq('user_id', user.id)

    return !error
  } catch (err) {
    console.warn('Exception deleting trip from Supabase:', err)
    return false
  }
}
