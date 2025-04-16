class Book:
    def __init__(self, title, author, isbn):
        self.title = title
        self.author = author
        self.isbn = isbn
        self.is_available = True

    def borrow(self):
        if self.is_available:
            self.is_available = False
            print(f'You have borrowed "{self.title}".')
        else:
            print(f'Sorry, "{self.title}" is not available.')

    def return_book(self):
        self.is_available = True
        print(f'You have returned "{self.title}".')

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
        print(f'Book "{title}" not found in the library.')

    def return_book(self, title):
        for book in self.books:
            if book.title.lower() == title.lower():
                book.return_book()
                return
        print(f'Book "{title}" not found in the library.')

# Testing the classes
library = Library()

# Adding books to the library
book1 = Book("1984", "George Orwell", "9780451524935")
book2 = Book("To Kill a Mockingbird", "Harper Lee", "9780061120084")
book3 = Book("The Great Gatsby", "F. Scott Fitzgerald", "9780743273565")

library.add_book(book1)
library.add_book(book2)
library.add_book(book3)

# Borrowing and returning books
library.borrow_book("1984")  # Should borrow
library.borrow_book("1984")  # Should say it's not available
library.return_book("1984")  # Should return
library.borrow_book("1984")  # Should borrow again