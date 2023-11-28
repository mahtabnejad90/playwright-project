import { Page, Locator } from '@playwright/test';
import { count } from 'console';

export class BookingPageObjects {

  readonly page: Page;
  readonly cookieBannerContainer: Locator;
  readonly cookieBannerAcceptButton: Locator;
  readonly cookieBannerDeclineButton: Locator;
  readonly staysLink: Locator;
  readonly flightsLink: Locator;
  readonly flightsHotelLink: Locator;
  readonly carRentalsLink: Locator
  readonly attractionsLink: Locator;
  readonly airportTaxisLink: Locator;
  readonly landingPageHeroTitle: Locator;
  readonly landingPageHeroSubtitle: Locator;
  readonly searchboxContainer: Locator;
  readonly destinationTextbox: Locator;
  readonly destinationInputText: Locator;
  readonly destinationSelectButton : (
    nameOfDestination: string,
  ) => Locator;
  readonly datePickerTabsContainer: Locator;
  datePickerSearchSelector: Locator;

  readonly occupancyConfigSelectBox: Locator;
  readonly groupAdultsInputSelector: Locator;
  readonly groupChildrenInputSelector: Locator;
  readonly groupRoomsInputSelector: Locator;
  readonly decreaseNumberOfAdultsQuantityButton: Locator;
  readonly searchButton: Locator;
  readonly hotelNameTextBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cookieBannerContainer = page.getByLabel('Cookie banner')
    this.cookieBannerAcceptButton = page.getByRole('button', { name: 'Accept' })
    this.cookieBannerDeclineButton = page.getByRole('button', { name: 'Decline' })
    this.staysLink = page.locator('#accommodations')
    this.flightsLink = page.locator('#flights')
    this.flightsHotelLink = page.locator('#packages')
    this.carRentalsLink = page.locator('#cars')
    this.attractionsLink = page.locator('#attractions')
    this.airportTaxisLink = page.locator('#airport_taxis')
    this.landingPageHeroTitle = page.getByTestId('herobanner-title1')
    this.landingPageHeroSubtitle = page.getByTestId('herobanner-subtitile')
    this.searchboxContainer = page.getByTestId('searchbox-layout-wide')
    this.destinationTextbox = page.getByTestId('location-destination-container')
    this.destinationInputText = page.getByPlaceholder('Where are you going?')
    //dynamic value input
    this.destinationSelectButton = (
      nameOfDestination: string,
    ) => {
      return page.getByRole('button', {name: nameOfDestination});
    };
    this.datePickerTabsContainer = page.getByTestId('searchbox-dates-container')
    this.datePickerSearchSelector = page.getByText('searchbox-datepicker')
    this.searchButton = page.getByRole('button', { name: 'Search' })
    this.occupancyConfigSelectBox = page.getByTestId('occupancy-config')
    this.groupAdultsInputSelector = page.locator('#group_adults')
    this.decreaseNumberOfAdultsQuantityButton = page.locator('div').filter({ hasText: /^2$/ }).locator('button').first()
    this.groupChildrenInputSelector = page.locator('#group_children')
    this.groupRoomsInputSelector = page.locator('#no_rooms')
    this.hotelNameTextBox = page.getByRole('heading', { name: 'Rest Boutique Notting Hill', exact: true })
  }
  async dismissCookieBanner() {
    if ((await this.cookieBannerContainer.isVisible())) {
      await this.cookieBannerAcceptButton.click();
    } 
  }

  async selectDates() {
    /*
    since container opens automatically after selecting the destionation, 
    we will use the clickcount = 2 in order to close and open it again
    */
    await this.datePickerTabsContainer.click({clickCount: 2});
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 2);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 5);
    // Function to format dates
    const formatDate = (date: Date) => {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };
    // Select the dates
    await this.page.click(`[data-date="${formatDate(startDate)}"]`);
    await this.page.click(`[data-date="${formatDate(endDate)}"]`);
    // Clicks off the date picker container
    await this.datePickerTabsContainer.click()
  }

}
