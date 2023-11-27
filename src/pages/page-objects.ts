import { Page, Locator } from '@playwright/test';

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
  readonly datePicketTabsContainer: Locator;
  readonly dateStartTabSelectBox: Locator;
  readonly dateEndTabSelectBox: Locator;
  readonly occupancyConfigSelectBox: Locator;
  readonly groupAdultsInputSelector: Locator;
  readonly groupChildrenInputSelector: Locator;
  readonly groupRoomsInputSelector: Locator;
  readonly decreaseNumberOfAdultsQuantityButton: Locator;
  readonly searchButton: Locator;

  //page.locator('div').filter({ hasText: /^2$/ }).locator('button').first()

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
    this.datePicketTabsContainer = page.getByTestId('datepicker-tabs')
    this.dateStartTabSelectBox = page.getByTestId('date-display-field-start')
    this.dateEndTabSelectBox = page.getByTestId('date-display-field-end')
    this.searchButton = page.getByRole('button', { name: 'Search' })
    this.occupancyConfigSelectBox = page.getByTestId('occupancy-config')
    this.groupAdultsInputSelector = page.locator('#group_adults')
    this.decreaseNumberOfAdultsQuantityButton = page.locator('div').filter({ hasText: /^2$/ }).locator('button').first()
    this.groupChildrenInputSelector = page.locator('#group_children')
    this.groupRoomsInputSelector = page.locator('#no_rooms')

  }
  async dismissCookieBanner() {
    if ((await this.cookieBannerContainer.isVisible())) {
      await this.cookieBannerAcceptButton.click();
    } 
  }

}
