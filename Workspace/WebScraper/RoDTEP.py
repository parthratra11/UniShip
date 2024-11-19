from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver =  webdriver.Chrome()

RoDTEPList = []
driver.get('https://www.dgft.gov.in/CP/?opt=RoDTEP')
content = driver.find_elements(By.XPATH, '//*')

for element in list(content):
    if element.get_attribute('class') == 'row':
        tags = element.find_elements(By.TAG_NAME, 'a')
        for tag in tags:
            tempTag = tag.get_attribute('href')
            if (tempTag) and ('RoDTEP' in tempTag) and ('.pdf' in tempTag):
                RoDTEPList.append(tempTag)
                print(tempTag)