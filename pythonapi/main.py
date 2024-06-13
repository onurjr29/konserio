import requests

url = "https://www.biletix.com/solr/tr/select/?start=0&rows=20&q=*:*&fq=start%3A%5B2024-05-26T00%3A00%3A00Z%20TO%202026-05-27T00%3A00%3A00Z%2B1DAY%5D&sort=score%20desc,start%20asc&&wt=json&indent=true&facet=true&facet.field=category&facet.field=venuecode&facet.field=region&facet.field=subcategory&facet.mincount=1&json.wrf=jQuery111309886616012972471_1716737102852&_=1716737102853"  # Veriyi almak istediğiniz URL
response = requests.get(url)

if response.status_code == 200:
    print(response.text)  # Veriyi yazdırma
else:
    print("Error:", response.status_code)
