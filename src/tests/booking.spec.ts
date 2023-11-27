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
    await expect(bookingPageObjects.searchboxContainer).toBeVisible()
    await expect(bookingPageObjects.destinationTextbox).toBeVisible()
    //add assertion for date picker
    //add assertion for occupancy config
    //add assertion for search button
    //add action for user to search a destination
    //add action for user to select for a destination
    //add action for user to select check-in date
    //add action for user to select check-out date
    //add action for user to select number of adults
    //add action for user to select number of rooms
    //add action for user to click the search button
  })

  test('test block skeleton 4', async ({ page }) => {
    await bookingPageObjects.dismissCookieBanner()
  })

  test('test block skeleton 5', async ({ page }) => {
    await bookingPageObjects.dismissCookieBanner()
  })

  test('test block skeleton 6', async ({ page }) => {
    await bookingPageObjects.dismissCookieBanner()
  })

  test('test block skeleton 7', async ({ page }) => {
    //add code
  })

})