import requests
import json

def make_api_call(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raises HTTPError for bad responses
        return response.json()
    except requests.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err} - Status Code: {response.status_code}")
    except Exception as err:
        print(f"Other error occurred: {err}")
    return None

def compare_counts(url_template, params):
    results = {}
    for period in ['YEAR', 'ALL']:
        # Replace timeFrame or since_period in the URL with the current period
        url = url_template.replace('TIMEFRAME', period)
        data = make_api_call(url)
        if data and 'feedbackCount' in data:  # Adjust this key based on the correct response field for each API
            results[period] = data['feedbackCount']
        elif data and 'meta' in data and 'count' in data['meta']:
            results[period] = data['meta']['count']
        else:
            results[period] = 'Error'
            print(f"Failed to retrieve count for {period}; here's the data received:", data)
    return results

def main():
    url1 = "https://www.feefo.com/api/feedbacks/count/currys?displayFeedbackType=PRODUCT&locale=en-gb&pageNumber=0&sku=10239769&sort=newest&tags=%7B%7D&timeFrame=TIMEFRAME"
    url2 = "https://api.feefo.com/api/10/reviews/summary/product?locale=en_GB&product_sku=10239769&origin=www.currys.co.uk&merchant_identifier=currys&since_period=TIMEFRAME"

    counts1 = compare_counts(url1, ['YEAR', 'ALL'])
    counts2 = compare_counts(url2, ['YEAR', 'ALL'])

    # Determine pass/fail based on consistency of 'YEAR' vs 'ALL' counts for each API
    pass_fail1 = "Pass" if counts1['YEAR'] == counts1['ALL'] and counts1['YEAR'] != 'Error' else "Fail"
    pass_fail2 = "Pass" if counts2['YEAR'] == counts2['ALL'] and counts2['YEAR'] != 'Error' else "Fail"

    output = {
        "API1 Counts": counts1,
        "API1 Pass/Fail": pass_fail1,
        "API2 Counts": counts2,
        "API2 Pass/Fail": pass_fail2
    }

    with open('api_comparison_result.json', 'w') as f:
        json.dump(output, f, indent=4)

    print("Output has been written to api_comparison_result.json")

if __name__ == "__main__":
    main()
