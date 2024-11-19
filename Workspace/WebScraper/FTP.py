from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver =  webdriver.Chrome()

def getPolicy(FTPList):
    content = driver.find_elements(By.TAG_NAME, 'a')
    for element in content:
        tempTag = element.get_attribute('href')
        if tempTag and 'pdf' in tempTag:
            FTPList.append(tempTag)
            print(tempTag)

def getFTPage(FTPList):
    getPolicy(FTPList)

    content = driver.find_elements(By.TAG_NAME, 'a')
    for element in content:
        if element.get_attribute('class') == 'page-link':
            if ('disabled' not in (element.find_element(By.XPATH, '..').get_attribute('class'))) and (element.text == 'Next'):
                element.click()
                time.sleep(2)
                getFTPage(FTPList)
    return 

FTPList = []
driver.get('https://www.dgft.gov.in/CP/?opt=ft-policy')
getFTPage(FTPList)