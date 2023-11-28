export class Tags {
  static getTags(
    functionalArea?: string,
    disableTags?: {
        disableCi?: boolean;
        disableLocal?: boolean;
      },
  ): string {
    //if not defined in tests, then default boolean value for disabling tests is false
    if (!disableTags) {
      disableTags = {
        disableCi: false,
        disableLocal: false
      };
    }
    const tags: string[] = [];
  
    // Check each tag's active state and add only active tags
    if (!disableTags.disableCi) {
      tags.push('@ci');
    }
    if (!disableTags.disableLocal) {
      tags.push('@local');
    }
  
    // Return the active tags, joined with ', ' for indentation and spacing
    return tags.length > 0 ? ' - ' + tags.join(', ') : '';
  }
  
  static e2e = 'e2e';
  static ui = 'ui'
  static integration = 'integration'
  static api = 'api'
  static flights = 'flights'
  static hotels = 'hotels'
  static login = 'login'
  static signup = 'signup'
  static carRentals = 'car-rentals'
  static attractions = 'attractions'
  static airportTaxis = 'airport-taxis'
}
  