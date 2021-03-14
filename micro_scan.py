
# Scrapes all data from closeouts and saves as a json file.

# 3/14/21 Editing this to scrape only 


# In[13]:

from bs4 import BeautifulSoup
import requests
import re
# import discord
import json
import datetime

# In[2]:


baseURL = 'https://www.microcenter.com'
mcURL = 'https://www.microcenter.com/search/search_results.aspx?Ntk=all&sortby=match&N=4294966937&myStore=false'


#ents
storeID = '&storeid=145'
itemsPerPage = '&rpp=96'


# In[3]:


page = requests.get(mcURL)
soup = BeautifulSoup(page.content, 'html.parser')


# In[4]:


# hotdeals = soup.find(id="hotdeals")
# hotdealsList = soup.find_all('div', class_="hotdealItem")
# len(hotdealsList)
# hotdealsLinks = []
# for hotdeal in hotdealsList:
#     hotdeal_h2 = hotdeal.find('h2')
#     hotdeal_text = hotdeal_h2.find('a').text
#     hotdeal_href = hotdeal_h2.find('a')['href']


# ## TODO
# 
# - Multithread each link under closeouts and scrape all of the information.
# - Handle multiple stores

# Start with one section and build optimal URL. Then expand to multiple stores, then multiple sections per store.

# In[5]:


# test_closeout_url='/search/search_results.aspx?N=4294966998,518&prt=&feature=139717'
sectionURL = '{}{}{}'.format(mcURL, storeID, itemsPerPage)
print(sectionURL)


# ## cycling through pages
# 
# Find pattern to check how many pages are necessary. Then iterate through URLs.

# In[6]:


# returns a list of URLS from a single page
def getItemsFromPage(soup):
    productURLs = []
    products = soup.find('article', class_='products col3')
    products = products.find('ul')
    products = products.find_all('li', class_='product_wrapper')
    print(len(products))
    for product in products:
        product = product.find('div', class_=re.compile('^pDescription compressedNorm*'))
        link = product.find('a')['href']
        productURLs.append(link)
    
    return productURLs


# In[10]:

# check how many pages needed to cycle through.
productURLs = []


pagesEnt = '&page='
pageCount=1
while True:
    testPageCounting = requests.get('{}{}{}'.format(sectionURL, pagesEnt, pageCount))
    testSoup = BeautifulSoup(testPageCounting.content, 'html.parser')

    if testSoup.find('article', class_='products col3') == None:
        break

    productURLs += getItemsFromPage(testSoup)    

    print('Finished page', pageCount)
    pageCount=pageCount+1

len(productURLs)


# ## TODO
# - Separate count do we can categorize them by store
# - Handle open box items properly
# - Download images locally

# In[7]:

#TODO: Understand why it fails here.

def genProductDict(test_url):
    full_url = baseURL + test_url
    productPage = requests.get(full_url)
    productSoup = BeautifulSoup(productPage.content, 'html.parser')

    details = productSoup.find(id='details')
    details_header = details.find('h1')
    details_span = details_header.find('span')

    price = productSoup.find(id='pricing')
    try:
        price_float = float(price.text.strip()[1:])
    except ValueError:
        price_float = 'Unknown'
    except AttributeError:
        price_float = 'Unknown_attrib'
    count = productSoup.find('span', class_='inventoryCnt')
    
    try:
        count_int = int(re.sub("[^0-9]", "", count.text))
    except ValueError:
        count_int = 0      #out of stock
    except AttributeError:
        count_int = 0      #out of stock but open box available

    inline_panel = productSoup.find('dl', class_="inline")
    dds = inline_panel.find_all('dd') #0: SKU, #1: Model Number, #2: UPC

    image = productSoup.find('img', class_='productImageZoom')
    try:
        imageURL = image['src']
    except TypeError:
        imageURL = ''
   

    product_dict = {
        dds[0].text.strip() : {
            'name' : details_span.text.strip(),
            'price' : price_float,
            'count' : count_int,
            'sku': dds[0].text.strip(),
            'modelnum': dds[1].text.strip(),
            'upc' : dds[2].text.strip(),
            'url' : full_url,
            'image' : imageURL,
            'timestamp' : datetime.datetime.now()  #json serializable
        }
    }
    return product_dict


# In[114]:

#does a mass update of all items
products_db = {}
for url in productURLs:
    print("Attempting", url)
    products_db.update(genProductDict(url))
    print("Success")

print(list(products_db.values())[0])

# In[ ]:
# Dump dictionary to json for use for bot
with open("products.json", "w") as out:
    print('Dumping to JSON file')
    json.dump(products_db, out, indent=2, default=str)
    print('Success')

# %%
