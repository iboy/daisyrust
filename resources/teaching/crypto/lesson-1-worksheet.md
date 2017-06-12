---
layout: worksheet-lesson
title: Introduction to Cryptography - Worksheet
permalink: resources/teaching/crypto/lesson-1/worksheet/
kind: worksheet
next: ../../lesson-2/worksheet/
nextButton: false
---

In this lesson you will: 


* Meet Alice, Bob and Eve;
* See an overview of the process of exchanging secret **keys** in public;
* See a simple and more complex cipher algorithm working together;
* See how *visual cryptography* works.
* Learn and discuss some key words and concepts: 
  * cyptography, 
  * encryption, 
  * decryption; 
  * public-keys and key exchange;  
  * ciphers: substitution ciphers
  * digital signatures

## What is cryptography? (5 minutes)


**Crypto-** = hidden or secret

**-graphy** = writing


<img src="{{site.baseurl}}/resources/teaching/crypto/images/basic_crypto.jpg" width="600" alt="Basic Cryptography">

Why do we need secret communications?

How do we ensure our communications on the internet are kept 'private'? 

## Your mission ##

Decrypt the following message:

**ZNLQNL! ZNLQNL! ZNLQNL!**

## Demonstration: How do we share a secret key in public (10 minutes)##

This is known as the **key-exchange problem**.

First we will see how 'secret' communications can happen in public.
Meet Bob and Alice.
Bob and Alice wish to share some information. 
Eve, is a snooper and is eavesdropping on all their communications.



<img src="{{site.baseurl}}/resources/teaching/crypto/images/Bob_Alice_Public_Private.png" width="480" alt="Bob, Alice and Eve">


Can you work out how Alice can send the box and all it's contents so Bob can open it, but Eve cannot?


## What's in the box? (10 minutes)##


* Here is a cipher disk for everyone
* A sealed envelope (do not open it yet)
* A random pattern

Take a very close look at the seal on the envelope.

Open the envelope and see if you can piece together the clues to solve the original cipher:

**ZNLQNL! ZNLQNL! ZNLQNL!**

This is known as the *Caesar Cipher* or *Substitution Cipher* or *Shift Cipher*. It has lots of names.


## How does the 'visual cryptography' work (3 minutes)?


<img src="{{site.baseurl}}/resources/teaching/crypto/images/xor_overlay.png" width="400" alt="Xor Overlay">


<img src="{{site.baseurl}}/resources/teaching/crypto/images/enciphering_a_bitmap_.png" width="800" alt="Enciphering a bitmap">


## Plenary: Discuss the following questions (2 minutes)##


Why is the original encrypted message *weak*?

How can we make cipher algorithms *stronger*?

What can you use 'visual cryptography' for? 




## Here's the python code (reference material)##

If we have time we can talk through it. If not read the comments, they explain the process.

  ```python
  #To run at command line type: 
  #
  #python /path/to/script/scriptName.py path/to/source/bitmap/image.png
  #
  #This file takes one argument which is a file that you 
  #would like to split into two encrypted images.
  #The original image can only be viewed by overlaying 
  #the two encrypted images.
  #If printed on clear plastic, It can be very finicky to align
  #the two images if the pixel count is too high.
  #For best results keep the original image below 200x200 pixels 
  #and print as large as possible onto clear plastic to
  #obtain the best results.
  #You can go to higher resolutions but you then really have 
  #to be precise when aligning the two images.
  #The resulting images will be twice as wide and twice as 
  #tall pixelwise and there is only 1 bit colour.
  #we will need to read and write(create) an image
  #so import libraries from the python image library

  from PIL import Image, ImageDraw 
  import os, sys
  from random import SystemRandom
  random = SystemRandom()
  #If you want to use the more powerful PyCrypto (pip install pycrypto) then uncomment the next line and comment out the previous two lines
  #from Crypto.Random import random

  #Check if the script has the correct number of command line arguments 
  if len(sys.argv)!=2:
  	print "This takes one argument; the image to be split."
  	exit()
  infile=str(sys.argv[1])

  if not os.path.isfile(infile):
  	print "That file does not exist."
  	exit()

  #If the file exists 'open' it by assigning its bits to a variable
  img = Image.open(infile)

  f, e = os.path.splitext(infile)
  out_filename_A=f+"_A.png"
  out_filename_B=f+"_B.png"
  
  img=img.convert('1')#convert image to 1 bit
  
  #Prepare two empty images for drawing - twice the size
  width=img.size[0]*2
  height=img.size[1]*2
  out_image_A = Image.new('1', (width, height))
  out_image_B = Image.new('1', (width, height))
  draw_A = ImageDraw.Draw(out_image_A)
  draw_B = ImageDraw.Draw(out_image_B)

  #There are 6(4 choose 2) possible patterns
  #These relate to the xor and overlay diagrams above
  #For every black or white pixel in the original image
  #the loop below replaces them systematically with 
  #a pattern.
  #Black pixels get replaced with pattern and 'anti-pattern'
  #to create a mixed black pixel on the final overlaid image
  patterns=((1,1,0,0), (1,0,1,0), (1,0,0,1), (0,1,1,0), (0,1,0,1), (0,0,1,1))
  #Cycle through pixels
  for x in xrange(0, width/2):
  	for y in xrange(0, height/2):
  		pixel=img.getpixel((x,y))
  		pat=random.choice(patterns)
  		#A will always get the pattern
  		draw_A.point((x*2, y*2), pat[0])
  		draw_A.point((x*2+1, y*2), pat[1])
  		draw_A.point((x*2, y*2+1), pat[2])
  		draw_A.point((x*2+1, y*2+1), pat[3])
  		if pixel==0:#Dark pixel so B gets the anti pattern
  			draw_B.point((x*2, y*2), 1-pat[0])
  			draw_B.point((x*2+1, y*2), 1-pat[1])
  			draw_B.point((x*2, y*2+1), 1-pat[2])
  			draw_B.point((x*2+1, y*2+1), 1-pat[3])
  		else:
  			draw_B.point((x*2, y*2), pat[0])
  			draw_B.point((x*2+1, y*2), pat[1])
  			draw_B.point((x*2, y*2+1), pat[2])
  			draw_B.point((x*2+1, y*2+1), pat[3])

  out_image_A.save(out_filename_A, 'PNG')
  out_image_B.save(out_filename_B, 'PNG')
  print "Done."
  ```


## What's next

Alone or with help, see if you can get the python code working.

Discuss and discover: How do we use mathematics to make stronger encryption?

See: 

* factorisation
* prime numbers
* modular (or clock) arithmetic;
* randomness


