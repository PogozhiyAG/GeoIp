﻿$(document).ready(function () {
    const $divResult = $('#div-result');
    const $txtSearch = $('#txt-search');
    const $templateResponse = $('#template-response');
    const $searchExamples = $('.search-example');

    const renderResponseTemplate = doT.compile($templateResponse.html());

    const renderResponse = (response) => {
        if (response.code == 'OK') {
            $divResult.html(renderResponseTemplate(response));
        } else if (response.code == 'NOT_FOUND') {
            $divResult.html(response.message)
        } else if (response.code == 'ERROR') {
            $divResult.html('ERROR: ' + response.message)
        }
    };

    const doSearch = () => {
        $.getJSON('search?searchString=' + encodeURIComponent($txtSearch.val()), renderResponse);
    };

    $txtSearch.change(doSearch);
    $txtSearch.keyup(doSearch);

    $searchExamples.click(function() {
        $txtSearch.val($(this).text());
        doSearch();
    });
});