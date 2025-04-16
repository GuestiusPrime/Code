import tkinter as tk
from tkinter import ttk
import json
from tkinter import font

class ScheduleMaker:
    def __init__(self, root):
        self.root = root
        self.root.title("Weekly Schedule Maker")
        
        # Configure style
        self.style = ttk.Style()
        self.style.configure('Title.TLabel', font=('Helvetica', 16, 'bold'))
        self.style.configure('Header.TLabel', font=('Helvetica', 12, 'bold'))
        
        # Set window size and color
        self.root.geometry('600x700')
        self.root.configure(bg='#f0f0f0')
        
        # Schedule data structure
        self.schedule = {day: {} for day in ['Monday', 'Tuesday', 'Wednesday', 
                                           'Thursday', 'Friday', 'Saturday', 'Sunday']}
        
        self.create_widgets()
    
    def create_widgets(self):
        # Create main frame with custom styling
        self.main_frame = ttk.Frame(self.root, padding="20")
        self.main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        # Title
        title_label = ttk.Label(self.main_frame, text="Weekly Schedule Maker", style='Title.TLabel')
        title_label.grid(row=0, column=0, columnspan=2, pady=(0, 20))
        
        # Day selection with better styling
        day_frame = ttk.LabelFrame(self.main_frame, text="Select Day", padding="10")
        day_frame.grid(row=1, column=0, columnspan=2, sticky=(tk.W, tk.E), pady=(0, 15))
        
        self.day_var = tk.StringVar()
        day_combo = ttk.Combobox(day_frame, textvariable=self.day_var, width=30)
        day_combo['values'] = list(self.schedule.keys())
        day_combo.grid(row=0, column=0, padx=5, pady=5)
        day_combo.set('Monday')
        
        # Time entry with improved layout
        time_frame = ttk.LabelFrame(self.main_frame, text="Add New Activity", padding="15")
        time_frame.grid(row=2, column=0, columnspan=2, sticky=(tk.W, tk.E), pady=(0, 15))
        
        # Time entry row
        ttk.Label(time_frame, text="Time:", style='Header.TLabel').grid(row=0, column=0, padx=(0, 10))
        self.time_entry = ttk.Entry(time_frame, width=30)
        self.time_entry.grid(row=0, column=1, padx=5, pady=5)
        
        # Activity entry row
        ttk.Label(time_frame, text="Activity:", style='Header.TLabel').grid(row=1, column=0, padx=(0, 10))
        self.activity_entry = ttk.Entry(time_frame, width=30)
        self.activity_entry.grid(row=1, column=1, padx=5, pady=5)
        
        # Add button with styling
        add_button = ttk.Button(time_frame, text="Add Activity", command=self.add_activity)
        add_button.grid(row=2, column=0, columnspan=2, pady=(10, 0))
        
        # Schedule display with better formatting
        display_frame = ttk.LabelFrame(self.main_frame, text="Daily Schedule", padding="15")
        display_frame.grid(row=3, column=0, columnspan=2, sticky=(tk.W, tk.E), pady=(0, 15))
        
        self.schedule_text = tk.Text(display_frame, height=15, width=50, font=('Helvetica', 10))
        self.schedule_text.grid(row=0, column=0, padx=5, pady=5)
        
        # Add scrollbar
        scrollbar = ttk.Scrollbar(display_frame, orient='vertical', command=self.schedule_text.yview)
        scrollbar.grid(row=0, column=1, sticky=(tk.N, tk.S))
        self.schedule_text.configure(yscrollcommand=scrollbar.set)
        
        # Save/Load buttons with improved layout
        button_frame = ttk.Frame(self.main_frame)
        button_frame.grid(row=4, column=0, columnspan=2, pady=(0, 10))
        
        ttk.Button(button_frame, text="Save Schedule", 
                  command=self.save_schedule).grid(row=0, column=0, padx=10)
        ttk.Button(button_frame, text="Load Schedule", 
                  command=self.load_schedule).grid(row=0, column=1, padx=10)
    
    def add_activity(self):
        day = self.day_var.get()
        time = self.time_entry.get()
        activity = self.activity_entry.get()
        
        if time and activity:
            self.schedule[day][time] = activity
            self.update_display()
            self.time_entry.delete(0, tk.END)
            self.activity_entry.delete(0, tk.END)
    
    def update_display(self):
        self.schedule_text.delete(1.0, tk.END)
        day = self.day_var.get()
        header = f"Schedule for {day}\n"
        self.schedule_text.insert(tk.END, header, 'header')
        self.schedule_text.insert(tk.END, "="*40 + "\n\n")
        
        # Configure tags for styling
        self.schedule_text.tag_configure('header', font=('Helvetica', 12, 'bold'))
        self.schedule_text.tag_configure('time', font=('Helvetica', 10, 'bold'))
        self.schedule_text.tag_configure('activity', font=('Helvetica', 10))
        
        for time, activity in sorted(self.schedule[day].items()):
            self.schedule_text.insert(tk.END, f"{time}: ", 'time')
            self.schedule_text.insert(tk.END, f"{activity}\n", 'activity')
    
    def save_schedule(self):
        with open('schedule.json', 'w') as f:
            json.dump(self.schedule, f)
    
    def load_schedule(self):
        try:
            with open('schedule.json', 'r') as f:
                self.schedule = json.load(f)
                self.update_display()
        except FileNotFoundError:
            pass

if __name__ == "__main__":
    root = tk.Tk()
    app = ScheduleMaker(root)
    root.mainloop() 