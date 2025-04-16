import random
import time

def clean_room_game():
    # Initialize game variables
    room_messiness = 100
    player_energy = 100
    mom_patience = 100
    items = ["dirty socks", "homework papers", "empty snack wrappers", "toys", "books"]
    
    print("\n=== THE ROOM CLEANING CHALLENGE ===")
    print("Mom says: 'Please clean your room before going out!'")
    
    while room_messiness > 0 and mom_patience > 0 and player_energy > 0:
        print(f"\nRoom Messiness: {room_messiness}%")
        print(f"Your Energy: {player_energy}%")
        print(f"Mom's Patience: {mom_patience}%")
        
        print("\nChoose your action:")
        print("1. Clean quickly (uses more energy)")
        print("2. Clean slowly (saves energy)")
        print("3. Try to negotiate")
        print("4. Take a quick rest")
        
        choice = input("What will you do? (1-4): ")
        
        if choice == "1":
            cleaned = random.randint(15, 25)
            energy_loss = random.randint(20, 30)
            item = random.choice(items)
            print(f"\nYou quickly clean up the {item}!")
            room_messiness -= cleaned
            player_energy -= energy_loss
            mom_patience += 5
            
        elif choice == "2":
            cleaned = random.randint(5, 15)
            energy_loss = random.randint(5, 15)
            item = random.choice(items)
            print(f"\nYou carefully organize the {item}.")
            room_messiness -= cleaned
            player_energy -= energy_loss
            mom_patience -= 5
            
        elif choice == "3":
            patience_change = random.randint(-20, 10)
            print("\nYou try to negotiate with mom...")
            if patience_change > 0:
                print("Mom seems slightly convinced!")
            else:
                print("Mom is not having it!")
            mom_patience += patience_change
            
        elif choice == "4":
            energy_gain = random.randint(20, 30)
            patience_loss = random.randint(10, 20)
            print("\nYou take a quick break...")
            player_energy = min(100, player_energy + energy_gain)
            mom_patience -= patience_loss
            
        else:
            print("\nInvalid choice! Mom's patience decreases...")
            mom_patience -= 5
            
        # Keep values in valid range
        room_messiness = max(0, min(100, room_messiness))
        player_energy = max(0, min(100, player_energy))
        mom_patience = max(0, min(100, mom_patience))
        
        time.sleep(1)
    
    # Game end conditions
    if room_messiness <= 0:
        print("\nCongratulations! You cleaned the room!")
        print("Mom is proud of you!")
    elif mom_patience <= 0:
        print("\nGame Over! Mom lost her patience!")
        print("You're grounded!")
    else:
        print("\nGame Over! You're too tired to continue!")
        print("Maybe try again after a nap...")

if __name__ == "__main__":
    clean_room_game()

