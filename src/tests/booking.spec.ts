import { test, expect } from '@playwright/test';
import { BookingPageObjects } from '../pages/page-objects'
import { Tags } from '../libs/tags';

let pageObjects: BookingPageObjects;

test.describe.parallel('Booking E2E Test Scenarios'  + 
Tags.getTags(Tags.e2e, { disableCi: false, disableLocal: false }), 
() => {

  test.beforeEach(async ({ page }) => {
    pageObjects = new BookingPageObjects(page);
    await page.goto(process.env.PLAYWRIGHT_BOOKING_BASEURL as string);
  })

  test('test block skeleton 1', 
  async ({ page }) => {
    //add code 
  })

  test('test block skeleton 2', async ({ page }) => {
    //add code
  })

  test('test block skeleton 3', async ({ page }) => {
    //add code
  })

  test('test block skeleton 4', async ({ page }) => {
    //add code
  })

  test('test block skeleton 5', async ({ page }) => {
    //add code
  })

  test('test block skeleton 6', async ({ page }) => {
    //add code
  })

  test('test block skeleton 7', async ({ page }) => {
    //add code
  })

})