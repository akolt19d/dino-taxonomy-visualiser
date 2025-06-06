from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common import exceptions as ex

new_file = open("./static/new_dino_data.csv", "w")
with open("./static/dino_data.csv", "r+") as file:
    driver = webdriver.Chrome()
    lines = file.readlines()
    new_file.write(lines[0].strip() + ",img_link\n")
    for line in lines[1:]:
        split_line = line.split(",")
        url = split_line[-1].strip()
        dino = split_line[0].strip()

        driver.get(url)
        try:
            img = driver.find_element(By.CSS_SELECTOR, "#content img")
        except ex.NoSuchElementException as e:
            print(f"Error finding image for {dino}: {e}")
            new_file.write(f"{line.strip()},\n")
            continue
        img_url = img.get_attribute("src")
        new_file.write(f"{line.strip()},{img_url}\n")
    driver.quit()
    new_file.close()