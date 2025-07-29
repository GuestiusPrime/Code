import phonenumbers
from phonenumbers import geocoder
import time, random

def start_phone_tracer(target):
    print(f"[+] PhoneTracer v2.1 - OSINT")
    print(f"[*] Target: {target}")
    print(f"[*] Initiating trace...")
    p = phonenumbers.parse(target, None)
    r = geocoder.description_for_number(p, "English")
    print(f"[+] Location: {r}")
    print(f"[+] Trace complete")
start_phone_tracer("+447724391631")

import phonenumbers
from phonenumbers import geocoder
import folium

Key = "fe2e4a7cd21c4a22ab80a4e49e5d0a0e"
number = "+447724391631"
check_number = phonenumbers.parse(number)
number_location = geocoder.description_for_number(check_number, "en")

print("Location:", number_location)


from phonenumbers import carrier
service_provider = phonenumbers.parse(number)

print("Carrier:", carrier.name_for_number(service_provider, "en"))

from opencage.geocoder import OpenCageGeocode
geocoder = OpenCageGeocode(Key)

query = str(number_location)
results = geocoder.geocode(query)

lat = results[0]['geometry']['lat']
lng = results[0]['geometry']['lng']

print(lat,lng)

map_location = folium.Map(location = [lat,lng], zoom_start=9)
folium.Marker([lat,lng], popup=number_location).add_to(map_location)
map_location.save("mylocation.html")