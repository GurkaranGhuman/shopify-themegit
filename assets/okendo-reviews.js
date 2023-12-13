const dateFormat = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
});

window.okeReviewsWidgetOnInit = function () {
    // Removed 'Based on' from review total and move it to the side  
    var reviewsTotal = document.querySelector('.okeReviews-reviewsAggregate-summary-total');
    var summaryRating = document.querySelector('.okeReviews-reviewsAggregate-summary-rating');
    if (reviewsTotal && summaryRating) {
        summaryRating.append(reviewsTotal);
        reviewsTotal.innerText = reviewsTotal.innerText.split(' ')[2];
        reviewsTotal.style.display = 'block';
    }

    const ratingDistributionInners = document.querySelectorAll('.okeReviews-ratingDistribution-item-value-inner');
    for (const ratingDistributionInner of ratingDistributionInners) {
        const ratingDistributionForeground = ratingDistributionInner.querySelector('.okeReviews-barGraph-layer--foreground')
        const ratingDistributionCount = ratingDistributionInner.querySelector('.okeReviews-ratingDistribution-item-value-count')
        if (ratingDistributionCount && ratingDistributionForeground && ratingDistributionForeground.style.width) {
            ratingDistributionCount.innerText = ratingDistributionForeground.style.width
        }

    }

    const reviewMain = document.querySelector('.js-okeReviews-reviews-main');
    if (reviewMain) {
        const observer = new MutationObserver(formatDateForElement);
        observer.observe(reviewMain, { childList: true });
        formatDateForElement();
    }
}

function formatDateForElement() {
    const reviewDates = document.querySelectorAll('[data-oke-reviews-date]');
    for (const reviewDate of reviewDates) {
        const dateIsoString = reviewDate.getAttribute('data-oke-reviews-date');
        const date = new Date(dateIsoString);
        const localeDate = `${dateFormat.format(date)}`;
        reviewDate.innerText = localeDate;
    }
}