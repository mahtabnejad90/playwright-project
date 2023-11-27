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

  test('test block skeleton 3', async ({ page }) => {
    await bookingPageObjects.dismissCookieBanner()
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