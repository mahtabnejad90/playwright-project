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
  readonly datePickerTabsContainer: Locator;
  datePickerSearchSelector: Locator;
  readonly blueGeniusLogo: Locator;
  readonly dismissSignInPopUpModalIcon: Locator;
  readonly occupancyConfigSelectBox: Locator;
  readonly groupAdultsInputSelector: Locator;
  readonly groupChildrenInputSelector: Locator;
  readonly groupRoomsInputSelector: Locator;
  readonly decreaseNumberOfAdultsQuantityButton: Locator;
  readonly searchButton: Locator;
  readonly hotelNameTextBox: Locator;
  readonly headerSignInButton: Locator;
  readonly firstSearchResultOption: Locator;
  readonly applyChangesButton: Locator;
  readonly changeSearchButton: Locator
  readonly occupancyLayoutWideConfigSelectBox: Locator;

  //login page locators
  readonly loginPageHeader: Locator;
  readonly emailAddressLabelTextBox: Locator;
  readonly loginPageEmailAddressInputBox: Locator;
  readonly loginPageContinueWithEmailButton: Locator;
  readonly otherLoginOptionsText: Locator;
  readonly facebookLoginPlaceholder: Locator;
  readonly googleLoginPlaceholder: Locator;
  readonly appleLoginPlaceholder: Locator;
  readonly emailEntryErrorText: (
    errorText: string,
  ) => Locator;

  //accomodation page locators
  readonly accomodationSearchCheckinBox: Locator;
  readonly accomodationSearchCheckoutBox: Locator;
  readonly accomodationOccupancyConfigSelectBox: Locator;
  readonly accomodationOccupancyConfigDoneButton: Locator;
  readonly accomodationSearchButton: Locator;
  readonly accomodationDecreaseChildQuantityButton: Locator
  readonly reserveButton: Locator;

  //Details confirmation page elements
  readonly firtNameInputBox: Locator;
  readonly secondNameInputBox: Locator;
  readonly emailInputbox: Locator;
  readonly addressLineInputBox: Locator;
  readonly cityNameInputBox: Locator;
  readonly postalCodeInputBox: Locator;
  readonly mobileNumberInputBox: Locator;
  readonly mainGuestRadioButton: Locator;
  readonly finalDetailsButton: Locator;
  readonly completeBookingButton: Locator

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
    this.occupancyLayoutWideConfigSelectBox = page.getByTestId('searchbox-layout-wide').getByTestId('occupancy-config')
    this.groupAdultsInputSelector = page.locator('#group_adults')
    this.decreaseNumberOfAdultsQuantityButton = page.locator('div').filter({ hasText: /^2$/ }).locator('button').first()
    this.groupChildrenInputSelector = page.locator('#group_children')
    this.groupRoomsInputSelector = page.locator('#no_rooms')
    this.hotelNameTextBox = page.getByRole('heading', { name: 'Rest Boutique Notting Hill', exact: true })
    this.accomodationSearchCheckinBox = page.getByTestId('searchbox-checkin-container').getByTestId('date-display-field-start')
    this.accomodationSearchCheckoutBox = page.getByTestId('searchbox-checkout-container').getByTestId('date-display-field-end')
    this.accomodationOccupancyConfigSelectBox = page.getByTestId('searchbox-layout-vertical').getByTestId('occupancy-config')
    this.accomodationOccupancyConfigDoneButton = page.getByRole('button', { name: 'Done' })
    this.accomodationSearchButton = page.getByTestId('searchbox-layout-vertical').getByRole('button', { name: 'Search' })
    this.headerSignInButton = page.getByTestId('header-sign-in-button')
    this.loginPageHeader = page.getByRole('heading', { name: 'Sign in or create an account' })
    this.emailAddressLabelTextBox = page.getByText('Email address')
    this.loginPageEmailAddressInputBox = page.getByPlaceholder('Enter your email address')
    this.loginPageContinueWithEmailButton = page.getByRole('button', { name: 'Continue with email' })
    this.otherLoginOptionsText = page.getByText('or use one of these options')
    this.facebookLoginPlaceholder = page.getByLabel('Sign in with Facebook')
    this.googleLoginPlaceholder = page.getByLabel('Sign in with Google')
    this.appleLoginPlaceholder = page.getByLabel('Sign in with Facebook')
    this.emailEntryErrorText = (
      errorText: string,
    ) => {
      return page.getByText(errorText);
    };
    this.firstSearchResultOption = page.locator('.aab71f8e4e');
    this.blueGeniusLogo = page.getByLabel('blue Genius logo').getByRole('img')
    this.dismissSignInPopUpModalIcon = page.getByLabel('Dismiss sign in information.')
    this.applyChangesButton = page.getByRole('button', { name: 'Apply Changes' })
    this.changeSearchButton = page.getByRole('button', { name: 'Change Search' })
    this.accomodationDecreaseChildQuantityButton = page.locator('div').filter({ hasText: /^Children1$/ }).locator('button').first()
    this.reserveButton = page.getByRole('button', { name: 'I\'ll reserve' })
    this.firtNameInputBox =  page.getByLabel('First name\n *')
    this.secondNameInputBox = page.getByLabel('Last name\n *')
    this.emailInputbox = page.getByPlaceholder('Watch out for typos')
    this.addressLineInputBox = page.getByLabel('Address\n *', { exact: true })
    this.cityNameInputBox = page.getByLabel('City\n *')
    this.postalCodeInputBox = page.getByLabel('Zip/Post Code')
    this.mobileNumberInputBox = page.getByPlaceholder('+')
    this.mainGuestRadioButton = page.getByText('I am the main guest')
    this.finalDetailsButton = page.getByRole('button', { name: 'Next: Final details' })
    this.completeBookingButton = page.getByRole('button', { name: 'Complete booking' })
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

  async selectRoomQuantity(numberOfRooms: string) {
    const selectSelector = '.hprt-nos-select.js-hprt-nos-select';
    await this.page.selectOption(selectSelector, numberOfRooms)
  }

  async fillGuestDetails(){
    await this.firtNameInputBox.click();
    await this.firtNameInputBox.fill('Mahtab');
    await this.secondNameInputBox.click()
    await this.secondNameInputBox.fill('Tester')
    await this.emailInputbox.click()
    await this.emailInputbox.fill(process.env.PlAYWRIGHT_GUEST_EMAIL as string)
    await this.addressLineInputBox.click()
    await this.addressLineInputBox.fill("1 Charles Street")
    await this.cityNameInputBox.click()
    await this.cityNameInputBox.fill("London")
    await this.postalCodeInputBox.click()
    await this.postalCodeInputBox.fill('W1J 5DA')
    await this.mobileNumberInputBox.click()
    await this.mobileNumberInputBox.clear()
    await this.mobileNumberInputBox.fill("447454595894")
  }
}
