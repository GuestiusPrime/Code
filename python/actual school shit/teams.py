import random
import math
import time

def assign_teams(people, k):
    teams = [[] for _ in range(k)]
    
    for i, person in enumerate(people):
        teams[i % k].append(person)
    
    return teams

time.sleep(0.3)

print('Welcome to the random team creator!\n')

time.sleep(0.5)

lst = list()
for i in range(1, int(input('How many people? '))+1):
    if i == 1:
        lst.append(input(f'Enter the {i}st person: '))
    elif i == 2:
        lst.append(input(f'Enter the {i}nd person: '))
    elif i == 3:
        lst.append(input(f'Enter the {i}rd person: '))
    else:
        lst.append(input(f'Enter the {i}st person: '))

time.sleep(1)

team_amount = int(input('Enter the number of teams: '))

time.sleep(0.4)

team_members = len(lst)//team_amount

time.sleep(0.3)

random.shuffle(lst)

time.sleep(0.7)

print(assign_teams(lst, team_amount))
