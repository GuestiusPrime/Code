# import necessary shyt

from __future__ import annotations

# define everything

class Book:
    def __init__(self, title, author, isbn):
        self.title = title
        self.author = author
        self.isbn = isbn
        self.is_available = True

    def borrow(self):
        if self.is_available:
            self.is_available = False
            print(f"You have borrowed {self.title}\n")
        else:
            print("Sorry, this book's not available right now\n")

    def return_book(self):
        self.is_available = True
        print(f'Thanks for returning {self.title}!\n')
    
class Library:
    def __init__(self):
        self.books = []

    def add_book(self, book):
        self.books.append(book)
    
    def borrow_book(self, title):
        for book in self.books:
            if book.title.lower() == title.lower():
                book.borrow()
                return
        print(f"{title.capitalize()} wasn't found in the library, sorry\n")

    def return_book(self, title):
        for book in self.books:
            if book.title.lower() == title.lower():
                book.return_book()
                return
        print(f"{title.capitalize()} wasn't found in the library, sorry\n")
# ts imma be testing

library = Library()

book1 = Book('Moby Dick', 'Herman Melville', 9789354407345)
book2 = Book('I Fell In Love With Hope', 'Lancali', 9781668034538)
book3 = Book('The Great Gatsby', 'F. Scott Fitzgerald', 9780743273565)

library.add_book(book1)
library.add_book(book2)
library.add_book(book3)

# display shit

print('Initial conditions (Book name | Author name | ISBN): \n')
print(book1.title, '|', book1.author, '|', book1.isbn, '|', '\n')
print(book2.title, '|', book2.author, '|', book2.isbn, '|', '\n')
print(book3.title, '|', book3.author, '|', book3.isbn, '|', '\n')

# and action

print('\nActions:\n')

while True:
    move = input('What do you wanna do?: ')
    print('')
    move = str(move.lower().strip())
    
    if move == 'borrow' or move == 'borrow book' or move == 'borrow a book':
        book = input('Which book do you wanna borrow? ')
        print('')
        book = str(book.lower().strip())
        if book == 'moby dick' or book == 'mb' or book == 'moby':
            library.borrow_book('Moby Dick')
        if book == 'i fell in love with hope' or book == 'ifilwh' or book == 'hope':
            library.borrow_book('I Fell In Love With Hope')
        if book == 'the great gatsby' or book == 'tgg' or book == 'great gatsby':
            library.borrow_book('The Great Gatsby')
    
    if move == 'return' or move == 'return book' or move == 'return a book':
        book = input('Which book do you wanna return? ')
        print('')
        book = str(book.lower().strip())
        if book == 'moby dick' or book == 'mb' or book == 'moby':
            library.return_book('Moby Dick')
        if book == 'i fell in love with hope' or book == 'ifilwh' or book == 'hope':
            library.return_book('I Fell In Love With Hope')
        if book == 'the great gatsby' or book == 'tgg' or book == 'great gatsby':
            library.return_book('The Great Gatsby')

    if move == 'end' or move == 'exit' or move == 'quit':
        exit()

