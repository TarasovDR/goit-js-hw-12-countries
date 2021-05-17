import _debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';
import countryCardTpl from '../templates/countryCardTpl.hbs';
import countryListTpl from '../templates/countryListTpl.hbs';

import { alert } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

const refs = {
  inputCountry: document.querySelector('.js-search__input'),
  renderCountryList: document.querySelector('.js-country__list'),
};
refs.inputCountry.addEventListener('input', _debounce(onInputClick, 500));

const emptyCountryList = () => (refs.renderCountryList.innerHTML = '');

const render = markup => {
  refs.renderCountryList.insertAdjacentHTML('beforeend', markup);
};

const renderMarkup = data => {
  const contriesArr = data.length;
  const countryCardMarkup = countryCardTpl(data);
  const countryListMakup = countryListTpl(data);

  if (contriesArr === 1) {
    render(countryCardMarkup);
  }
  if (contriesArr > 1 && contriesArr < 10) {
    render(countryListMakup);
  }
  if (contriesArr >= 10) {
    tooManyMachesFound();
  }
};

function onInputClick() {
  emptyCountryList();

  const countryName = refs.inputCountry.value;
  fetchCountries(countryName).then(renderMarkup).catch(tooManyMachesFound);
}

const tooManyMachesFound = () => {
  alert({
    type: 'notice',
    text: 'To many matches found. Please enter a more specific query!',
    delay: 3000,
    sticker: false,
    animateSpeed: 'slow',
  });
};
