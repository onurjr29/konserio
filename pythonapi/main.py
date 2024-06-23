import requests
from bs4 import BeautifulSoup

main_page = requests.get('https://www.biletinial.com/tr-tr/muzik')
soup = BeautifulSoup(main_page.text, 'html.parser')