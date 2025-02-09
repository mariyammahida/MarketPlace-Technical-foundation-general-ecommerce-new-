export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-18'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)
export const token = assertValue(
  "sknwZh9Nh61LcpxjIr3vrmJYsdwfjLvfjNZRNJUhONRpOR6hlVnYX1lonsWh6MrpkrLCBRA8v3QUvhYzybjK97U9UTyXDTWZ8lOmw6eYfj9KbitoAW8AdpeaHIlHHCvc7RODsEpDKPXH0vsHjm4FVVdTVJX1rKVARSRMxmqrp1tJIN2n6akv",
  "Missing environment variable: SANITY_API_TOKEN"
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
