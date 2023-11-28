import { test, expect, Response as PlaywrightResponse } from '@playwright/test';
import { BookingPageObjects } from '../pages/page-objects'
import { Tags } from '../libs/tags';


let bookingPageObjects: BookingPageObjects;

//generic UI/API test cases for booking website
test.describe.parallel('Generic Scenarios for Booking Website'  + 
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

  test('Verify ability searching for a destination from landing page', async ({ page }) => {
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

  test('Verify ability search for other accomodation when on a specific hotel page', async ({ page }) => {
    await bookingPageObjects.dismissCookieBanner()
    const postobelloHotelEndpoint = 'hotel/gb/portobello-notting-hill-london-double-room.en-gb.html?'
    await page.goto(process.env.PLAYWRIGHT_BOOKING_BASEURL as string + '/' + postobelloHotelEndpoint)
    await page.waitForLoadState()
    await expect(bookingPageObjects.hotelNameTextBox).toBeVisible()
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 2);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 5);
    const formatDate = (date: Date) => {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };
    await bookingPageObjects.accomodationSearchCheckinBox.click()
    await page.click(`[data-date="${formatDate(startDate)}"]`);
    await bookingPageObjects.accomodationSearchCheckoutBox.click()
    await page.click(`[data-date="${formatDate(endDate)}"]`);
    await bookingPageObjects.accomodationOccupancyConfigSelectBox.click()
    await bookingPageObjects.decreaseNumberOfAdultsQuantityButton.click()
    await bookingPageObjects.accomodationOccupancyConfigDoneButton.click()
    const page1Promise = page.waitForEvent('popup');
    await bookingPageObjects.accomodationSearchButton.click()
    const page1 = await page1Promise 
    await page1.waitForLoadState()
    const searchResultsURL = page1.url();
    console.log('Current URL:', searchResultsURL);
    await expect(searchResultsURL).toBeDefined()
  })

  test('Verify the GEO location of user via geolocation API', async ({ page }) => {
  // Declare capturedResponse as PlaywrightResponse or null
    let capturedResponse: PlaywrightResponse | null = null;

    // Set up an event listener for responses
    page.on('response', async (response) => {
      // Check if the response URL matches the expected API URL
      if (response.url() === process.env.PLAYWRIGHT_GEO_LOCATION_API_URL as string) {
        // Assign the response to capturedResponse
        capturedResponse = response;
      }
    });
    // Intercept the API call via the .route() method
    await page.route(process.env.PLAYWRIGHT_GEO_LOCATION_API_URL as string, route => {
      route.continue();
    });
    // Reload the page to trigger the API call
    await page.reload();
    // Add a 3 second wait
    await page.waitForTimeout(3000);

    // Check if the response was captured
    if (capturedResponse) {
      // Using type assertion to inform TypeScript of the specific type
      const status = await (capturedResponse as PlaywrightResponse).status();
      const responseBody = await (capturedResponse as PlaywrightResponse).json();
    
      expect(status).toBe(200);
      expect(responseBody).toEqual({
        country: "GB",
        state: "ENG",
        stateName: "England",
        continent: "EU"
      });
    } else {
      // If no response is captured, throw an error to fail the test
      throw new Error('Response from specified URL was not captured');
    }
  })
})

//tests UK locality for booking website
test.describe.parallel('Unhappy Path - Login - UK Locality'  + 
Tags.getTags(Tags.e2e + Tags.login, { disableCi: false, disableLocal: false }), 
() => {
  //emulates user locality to UK
  test.use({
    locale: 'en-GB',
  });
  test.beforeEach(async ({ page }) => {
    bookingPageObjects = new BookingPageObjects(page);
    await page.goto(process.env.PLAYWRIGHT_BOOKING_BASEURL as string);
    await page.waitForLoadState()
  })

  test('Login - Unhappy Path - User clicks on continue with no email address input - UK Locality', async ({ page }) => {
    await bookingPageObjects.dismissCookieBanner()
    await bookingPageObjects.headerSignInButton.click()
    await page.waitForLoadState()
    await bookingPageObjects.loginPageContinueWithEmailButton.click()
    //asserts the value for UK locality
    await expect(bookingPageObjects.emailEntryErrorText('Please enter your email')).toBeVisible()
  })
})

//tests UK locality for booking website
test.describe.parallel('Unhappy Path - Login - US Locality'  + 
Tags.getTags(Tags.e2e + Tags.login, { disableCi: false, disableLocal: false }), 
() => {
  //emulates user locality to US
  test.use({
    locale: 'en-US',
  });
  test.beforeEach(async ({ page }) => {
    bookingPageObjects = new BookingPageObjects(page);
    await page.goto(process.env.PLAYWRIGHT_BOOKING_BASEURL as string);
    await page.waitForLoadState()
  })

  test('Login - Unhappy Path - User clicks on continue with no email address input - UK Locality', async ({ page }) => {
    await bookingPageObjects.dismissCookieBanner()
    await bookingPageObjects.headerSignInButton.click()
    await page.waitForLoadState()
    await bookingPageObjects.loginPageContinueWithEmailButton.click()
    //asserts the value for US locality
    await expect(bookingPageObjects.emailEntryErrorText('Enter your email address')).toBeVisible()
    
  })
})

//verifies UI elements for another page
test.describe.parallel('Verify Login elements'  + 
Tags.getTags(Tags.e2e + Tags.login, { disableCi: false, disableLocal: false }), 
() => {

  test.beforeEach(async ({ page }) => {
    bookingPageObjects = new BookingPageObjects(page);
    await page.goto(process.env.PLAYWRIGHT_BOOKING_BASEURL as string);
    await page.waitForLoadState()
  })

  test('Verify Login UI Elements', async ({ page }) => {
    await bookingPageObjects.dismissCookieBanner()
    await expect(bookingPageObjects.headerSignInButton).toBeVisible
    await expect(bookingPageObjects.headerSignInButton).toHaveText('Sign in')
    await bookingPageObjects.headerSignInButton.click()
    await page.waitForLoadState()
    await expect(bookingPageObjects.loginPageHeader).toBeVisible()
    await expect(bookingPageObjects.emailAddressLabelTextBox).toBeVisible()
    await expect(bookingPageObjects.loginPageEmailAddressInputBox).toBeVisible()  
    await expect(bookingPageObjects.loginPageContinueWithEmailButton).toBeVisible()
    await expect(bookingPageObjects.otherLoginOptionsText).toBeVisible()
    await expect(bookingPageObjects.facebookLoginPlaceholder).toBeVisible()
    await expect(bookingPageObjects.googleLoginPlaceholder).toBeVisible()
    await expect(bookingPageObjects.appleLoginPlaceholder).toBeVisible()
  })
})

//verifies the booking flow for a given hotel
test.describe.parallel('Booking Flow'  + 
Tags.getTags(Tags.e2e + Tags.booking, { disableCi: false, disableLocal: false }), 
() => {

  test.beforeEach(async ({ page }) => {
    bookingPageObjects = new BookingPageObjects(page);
    await page.goto(process.env.PLAYWRIGHT_BOOKING_BASEURL as string);
    await page.waitForLoadState()
  })

  test('Verify the booking flow', async ({ page }) => {
    await bookingPageObjects.dismissCookieBanner()
    const postobelloHotelEndpoint = 'hotel/gb/portobello-notting-hill-london-double-room.en-gb.html?'
    await page.goto(process.env.PLAYWRIGHT_BOOKING_BASEURL as string + '/' + postobelloHotelEndpoint)
    await page.waitForLoadState()
    await bookingPageObjects.datePickerTabsContainer.click();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 20);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 4);
    const formatDate = (date: Date) => {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };
    await bookingPageObjects.page.click(`[data-date="${formatDate(startDate)}"]`);
    await bookingPageObjects.page.click(`[data-date="${formatDate(endDate)}"]`);
    await bookingPageObjects.datePickerTabsContainer.click();
    await bookingPageObjects.applyChangesButton.click()
    await page.goto(process.env.PLAYWRIGHT_BOOKING_BASEURL as string + '/' + postobelloHotelEndpoint)
    await bookingPageObjects.occupancyLayoutWideConfigSelectBox.click()
    await bookingPageObjects.accomodationDecreaseChildQuantityButton.click()
    await bookingPageObjects.accomodationOccupancyConfigDoneButton.click()
    if (!(await bookingPageObjects.applyChangesButton.isVisible())) {
      await bookingPageObjects.changeSearchButton.click();
    } 
    else{
      await bookingPageObjects.applyChangesButton.click()
    }
    await page.waitForLoadState()
    await bookingPageObjects.selectRoomQuantity('1')
    await bookingPageObjects.reserveButton.click()
    await page.waitForLoadState()
    await bookingPageObjects.fillGuestDetails()
    await bookingPageObjects.mainGuestRadioButton.click()
    await bookingPageObjects.finalDetailsButton.click()
    await page.waitForLoadState('networkidle')
    await expect(bookingPageObjects.completeBookingButton).toBeVisible()
  })
})
