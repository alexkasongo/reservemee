import Vue from 'vue'

export function capitalize(value) {
    if (!value) return '';
    value = value.toString();
    let initialFormat = value.replace(/-/g, ' ');
    let formattedValue = initialFormat.toLowerCase().split(' ');
    for (var i = 0; i < formattedValue.length; i++) {
        // You do not need to check if i is larger than formattedValue length, 
        // as your for does that for you
        // Assign it back to the array.
        formattedValue[i] =
            formattedValue[i].charAt(0).toUpperCase() +
            formattedValue[i].substring(1);
    }
    return formattedValue.join(' ');
};

export function truncate(text, length, suffix) {
    if (text.length > length) {
        return text.substring(0, length) + suffix;
    } else {
        return text;
    }
};

const filters = { capitalize, truncate }

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

// Vue.filter('capitalize', capitalize);