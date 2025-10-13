import tkinter as tk
from PIL import Image, ImageTk

window = tk.Tk()
onlyfiles = ['test1', 'test2', 'test3']
row = 0
images = []
for i in onlyfiles:
    name = i
    image = i
    label = tk.Label(text=name, anchor='w', width=30)
    label.grid(row=row, column=0)
    button = tk.Button(text='Play', command=lambda name=name: c.load('YoutubePlayer/SavedData/Audio/{}'.format(name)))
    button2 = tk.Button(text='Stop', command=lambda: c.stop())
    button.grid(row=row, column=1)
    button2.grid(row=row, column=2)
    imgref = Image.open('YoutubePlayer/SavedData/Thumbnails/{}.png'.format(image))
    width, height = imgref.size
    canvas = tk.Canvas(window, width=width, height=height)
    canvas.grid(row=row, column=3)
    images.append(ImageTk.PhotoImage(imgref))
    canvas.create_image(0, 0, anchor='nw', image=images[row])
    row = row + 1

window.mainloop()