import './styles.css';
import fetchCountries from './js/fetchCountries.js';
import cardCountry from './js/template/cardCountry.hbs';
import listCountry from './js/template/listCountry.hbs';
const debounce = require('lodash.debounce');
import 'pnotify/dist/PNotifyBrightTheme.css';
import PNotify from 'pnotify/dist/es/PNotify.js';

const formRef = document.querySelector('.js-form'),
      listRef = document.querySelector('#country-list');

formRef.addEventListener('input', debounce(onSearchInputValue, 500));

function onSearchInputValue(event) {
    event.preventDefault();
    clearList();

    const searchQuery = event.target.value;

    fetchCountries(searchQuery).then(data => {
        if (!data) {
            return;
        } else if (data.length > 10) {
                PNotify.error({
                    text: 'Too many matches find. Please enter a more specific query',
                });
        } else if (data.length >= 2 && data.length <= 10) {
                return createCountriesMarkup(data, listCountry);
        } else if (data.length === 1) {
                return createCountriesMarkup(data, cardCountry);
        } 
    });
}

function createCountriesMarkup(data, template) {
    const markup = data.map(country => template(country)).join('');
    listRef.insertAdjacentHTML('beforeend', markup);
}

function clearList() {
    listRef.innerHTML = '';
}