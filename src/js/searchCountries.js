import axios from 'axios';
import fetchCountries from './fetchCountries';
import _debounce from 'lodash.debounce';
import countryCardTpl from '../templates/countryCardTpl.hbs';
import countryListTpl from '../templates/countryListTpl.hbs';
import { alert } from '@pnotify/core';

axios.defaults.baseURL = 'https://restcountries.eu/rest/v2/name';

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
    alert('Too many matches found. Please enter a more specific query');
    tooManyMachesFound();
  }
};

function onInputClick() {
  emptyCountryList();

  const countryName = refs.inputCountry.value;
  fetchCountries(countryName).then(renderMarkup);
}

console.log({ alert });
const tooManyMachesFound = () => {};
