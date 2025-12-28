email = input('email: ')
email_str = email
verified = False

for i, char in enumerate(email_str):
    if char == '@':
        email_str = email_str[i:]
        if email_str == '@dawsoncollege.qc.ca':
            verified = True
        break

print(email_str, verified)