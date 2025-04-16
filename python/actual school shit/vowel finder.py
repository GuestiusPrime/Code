from typing import List

list = []
def vowel_finder(input: str) -> List[str]:
  #your code
  for char in input:
    if char.lower in ['a', 'e', 'i', 'o', 'u', 'y']:
      list.append[char]
  return list
  
list = vowel_finder(input)
print(list)