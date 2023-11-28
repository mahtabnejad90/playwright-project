import { test, expect } from '@playwright/test';
import { BookingPageObjects } from '../pages/page-objects'
import { Tags } from '../libs/tags';

let bookingPageObjects: BookingPageObjects;

test.describe.parallel('Test Scenarios for Booking Website'  + 
Tags.getTags(Tags.e2e, { disableCi: false, disableLocal: false }), 
() => {

  test.beforeEach(async ({ page }) => {
    bookingPageObjects = new BookingPageObjects(page);
    await page.goto(process.env.PLAYWRIGHT_BOOKING_BASEURL as string);
    await page.waitForLoadState()
  })

  test('Verify cookie banner container visibility', 
  async ({ page }) => {
    if (!(await bookingPageObjects.cookieBannerContainer.isVisible())) {
      expect(bookingPageObjects.cookieBannerContainer).not.toBeVisible()
    } 
    else{
      expect(bookingPageObjects.cookieBannerContainer).toBeVisible()
      expect(bookingPageObjects.cookieBannerAcceptButton).toBeVisible()
      expect(bookingPageObjects.cookieBannerDeclineButton).toBeVisible()
      await bookingPageObjects.cookieBannerAcceptButton.click()
      await expect(bookingPageObjects.cookieBannerContainer).not.toBeVisible()
    }
  })

  test('Verify landing page header and sub-header', async ({ page }) => {
    await bookingPageObjects.dismissCookieBanner()
    //toHaveText assertion is used to check for a text value in strict mode
    await expect(bookingPageObjects.landingPageHeroTitle).toHaveText('Find your next stay')
    //adding regex as assertion value here since the actual value can be dynamic
    await expect(bookingPageObjects.landingPageHeroSubtitle).toHaveText(/Search (low prices|deals) on hotels, homes, and much more.../)
  })

  test('Verify ability searching for a destination', async ({ page }) => {
    await bookingPageObjects.dismissCookieBanner()
    const landingPageURL = await page.url()
    //optional and can be commented out or removed, just used console log the URL of the page 
    console.log('Current URL:', landingPageURL);
    //verifies that the URL does not contain any fragments of searchresults 
    await expect(landingPageURL).not.toContain('searchresults.html?')
    await bookingPageObjects.destinationInputText.click()
    await bookingPageObjects.destinationInputText.fill('London')
    await bookingPageObjects.destinationSelectButton('London Greater London, United').click()
    await bookingPageObjects.selectDates()
    await bookingPageObjects.occupancyConfigSelectBox.click()
    await bookingPageObjects.decreaseNumberOfAdultsQuantityButton.click()
    await bookingPageObjects.searchButton.click()
    await page.waitForLoadState()
    //retrieves the URL of the page once search results page is loaded
    const searchResultsURL = page.url();
    //optional and can be commented out or removed, just used console log the URL of the page 
    console.log('Current URL:', searchResultsURL);
    //asserts a part
    await expect(searchResultsURL).toContain('searchresults.html?')
    //asserts unique part of the URL
    await expect(searchResultsURL).toContain('London')
  })

  test('Verify ability reserve a room for a given accomodation', async ({ page }) => {
    await bookingPageObjects.dismissCookieBanner()
   const postobelloHotelEndpoint = 'hotel/gb/portobello-notting-hill-london-double-room.en-gb.html?'
    await page.goto(process.env.PLAYWRIGHT_BOOKING_BASEURL as string + '/' + postobelloHotelEndpoint)
    await page.waitForLoadState()
    await expect(bookingPageObjects.hotelNameTextBox).toBeVisible()
    //add more code
  })

  test('Verify the GEO location of user via geolocation API', async ({ page }) => {
  
 // Declare capturedResponse without any types
 let capturedResponse;

 // Set up an event listener for responses
 page.on('response', async (response) => {
   if (response.url() === process.env.PLAYWRIGHT_GEO_LOCATION_API_URL as string) {
     capturedResponse = response;
   }
 });

 // Intercept the API call via the .route() method
 await page.route(process.env.PLAYWRIGHT_GEO_LOCATION_API_URL as string, route => {
   route.continue();
 });

 // reload the page so that the API call is expected 
 await page.reload()

 // Wait for a moment to ensure the response has been captured
 await page.waitForTimeout(3000); // add a 3 seconds less (conservative estimate)

 // Ensure the response has been captured
 if (capturedResponse) {
  
   // Get the response status and body
   const status = await capturedResponse.status();
   const responseBody = await capturedResponse.json();

   // Validate the response to be successful and return the expected values
   expect(status).toBe(200);
   expect(responseBody).toEqual({
     country: "GB",
     state: "ENG",
     stateName: "England",
     continent: "EU"
   });
 } else {
   throw new Error('Response from specified URL was not captured');
 }
})

  test('test block skeleton 6', async ({ page }) => {
    await bookingPageObjects.dismissCookieBanner()
  })

  test('test block skeleton 7', async ({ page }) => {
    await bookingPageObjects.dismissCookieBanner()
  })

})