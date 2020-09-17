import Vue from 'vue'


export default function capitalize(value) {
    if (!value) return '';
    value = value.toString();
    let initialFormat = value.replace(/-/g, ' ');
    let formattedValue = initialFormat.toLowerCase().split(' ');
    for (var i = 0; i < formattedValue.length; i++) {
        // You do not need to check if i is larger than formattedValue length, as your for does that for you
        // Assign it back to the array
        formattedValue[i] =
            formattedValue[i].charAt(0).toUpperCase() +
            formattedValue[i].substring(1);
    }
    return formattedValue.join(' ');
}

Vue.filter('capitalize', capitalize);