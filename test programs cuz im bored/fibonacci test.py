while True:

    n = int(input("which fibonacci number would you like to know? Enter the index in here: "))

    fibonacci_list = [0, 1]
    number = 2
    while number != n:
        fibonacci_list.append((fibonacci_list[number-1]) + (fibonacci_list[number-2]))
        number += 1

    print(fibonacci_list[-1])
