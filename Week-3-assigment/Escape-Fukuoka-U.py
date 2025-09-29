# Escape Fukuoka U

def printGraphic(name):
    if (name == "Title"):
        print('                                                                                            ')
        print(' _______                                _______     _                 _             _     _ ')
        print('(_______)                              (_______)   | |               | |           | |   | |')
        print(' _____    ___  ____ ____ ____   ____    _____ _   _| |  _ _   _  ___ | |  _ ____   | |   | |')
        print('|  ___)  /___)/ ___) _  |  _ \ / _  )  |  ___) | | | | / ) | | |/ _ \| | / ) _  |  | |   | |')
        print('| |_____|___ ( (__( ( | | | | ( (/ /   | |   | |_| | |< (| |_| | |_| | |< ( ( | |  | |___| |')
        print('|_______|___/ \____)_||_| ||_/ \____)  |_|    \____|_| \_)\____|\___/|_| \_)_||_|   \______|')
        print('                        |_|                                                                 ')
        print('                                                                                            ')
        print('--------------------------------------------------------------------------------------------')
        print('                                                                                            ')
        print('                                          福岡大学                                           ')
    elif (name == "Death"):
        print (" ")
        print ("(\__(\ *𝕘𝕒𝕤𝕡*")
        print ("(o _ o ).    ")
        print ("(/) (\ ).    ")
    elif (name== "Ramen"):
        print (".     ∧＿∧        ")
        print ("  ;;（´・ω・）     ")
        print ("＿旦_(っ(,,■)＿＿ ")
        print ("|l￣l||￣しﾞしﾞ￣|")
def altEnd():
    printGraphic("Death")
    print ("      ___              ___           ___  __      __        ___                     ___  __           ___            ___ ")
    print ("|  | |__  |    |        |  |__|  /\   |  /__`    /  \ |\ | |__     |  |  /\  \ /     |  /  \    |    |__   /\  \  / |__  ")
    print ("|/\| |___ |___ |___     |  |  | /~~\  |  .__/    \__/ | \| |___    |/\| /~~\  |      |  \__/    |___ |___ /~~\  \/  |___ ")
    print (" ")
    print ("Your lack of survival instincts lead you here.")
    print ("You Drank Ethanol")
    print(" ")

    print(":Thank you for playing?... maybe try again?")
def endpath():
    print ("You’re frustrated... but you found the exit... ")
    print ("You walk out and all  you can think about is how strange the night was.")
    print ("")
    printGraphic ("Ramen")
    print (" ")
    print ("  __  __  _  _  __  ___    __  ____  ___      _  _  __  _  _    ___  ___   __   __   ___  ___  ___     ___  _  _  _ _  _  _  __  _ _    __     _  _  _  _  _ ")
    print (" / _)/  \( \( )/ _)(  ,)  (  )(_  _)/ __)    ( \/ )/  \( )( )  (  _)/ __) / _) (  ) (  ,\(  _)(   \   (  _)( )( )( ) )( )( )/  \( ) )  (  )   ( )( )/ \/ \/ \ ")
    print ("( (_( () ))  (( (/\ )  \  /__\  )(  \__ \_    \  /( () ))()(    ) _)\__ \( (_  /__\  ) _/ ) _) ) ) )   ) _) )()(  )  \ )()(( () ))  \  /__\    )()( \_/\_/\_/ ")
    print (" \__)\__/(_)\_)\__/(_)\_)(_)(_)(__) (___/_)  (__/  \__/ \__/   (___)(___/ \__)(_)(_)(_)  (___)(___/   (_)   \__/ (_)\_)\__/ \__/(_)\_)(_)(_)   \__/ (_)(_)(_) ")
    print (" ")
    print ("You escaped! Your Math teacher never caught you. ")
    print ("You don’t have to think about your late homework, and you successfully avoided your responsibility.....")

    print ("Now you are enjoying a good bowl of Ramen.")
    print ("Thank you for playing! ")
def rightpath():
    print ("Text: You check... there seems to be ...nothing")
    print ("you ask to your self why was this even an option...anyways what do you decide next.")
    pcmd = input ("Use a toilet room... you feel like doing a number 2, you walk back to the hallway")
    if (pcmd == "Use a toilet room"):
        print ("You sit down on the toilet....Ready and all.......")
        print ("The floor shakes and cracks start to appear. You see dust and suddenly BOOM!  A loud noise... ")
        print ("the floor breaks and you find yourself on the first floor....You proceed to pull your pants up....")

        pcmd = input ("You Look around?")
        print(endpath)
        endpath()

def path1():
    print ("You check behind you...You thought the dolls would move right?...")
    print ("Indeed, nothing happened. The dolls are still blocking the hallway. They are just dolls, duh....")
    print ("But what is that?! A shadow OMG! That is your 数学教師 .... you start running....")
    pcmd = input ("Run towards your  数学教師, or Jump over the dolls...")
    if (pcmd == "Run towards your  数学教師"):
        print ("                                                        _     ")
        print ("|  ||_         _    | _|     _       _| _   |_|_  _ |_   )||| ")
        print ("|/\|| )\/  \)/(_)|_||(_|  \/(_)|_|  (_|(_)  |_| )(_||_  . ... ")
        print ("       /                  /                                   ")
        print ("You seem to lack survival instincts. Your Math teacher has caught you.")
        print ("You are forced to do your late math homework all night.")
        print("Thank you for playing?... maybe try again? ")
    else:
        print("You jump... You trip on the dolls, fall, and roll over towards the bathroom..... What a predicament")
        print(rightpath)
        rightpath()

def introStory():
    print ("You wake up in a strange room....")
    print ("you feel uneasy.....you look around, trying to find a way to leave")
    print ("You see a window, a sliding door, and a small room with lots of science supplies(U think)...")
    print ("which way do you go?")

    pcmd = input("please choose an action: Jump out the window, Go through the sliding door, Go in small room ")

    # player options
        #path 1
    if (pcmd == "Jump out the window"):
        print ("...You slammed your head on the window, nothing happens")
        print ("You are left with the feeling of immense regret.")
        print ("The window is completely shut...")
        print (" ")
        
        pcmd = input ("Choose a different path: Go back")
        introStory()
        #Path 2
    elif (pcmd == "Go through the sliding door"):
        print ("You open a door to the main hallway...")
        print ("you look around and it is dark... but not so much....")
        print ("you can barely notice the strange markings on every wall that read(遅れた宿題) over and over.")
        print ("You get chills and think to yourself, let me out of here...")
        print ("so you decide to ignore the markings and walk down the hallway.")
        print ("You find the front of the hallway blocked by dolls,")
        print ("and the right wall of the hall leads to the bathroom.")
        pcmd = input ("what do you do?: Jump over the dolls, duh.... these are just dolls-you say with a shaking voice, Go to the bathroom")
        if (pcmd == "Jump over the dolls, duh"):
            print (path1)
            path1()
        else:
            pcmd == "Go to the bathroom"
            print(rightpath)
            rightpath()
    
        #path 3
    else:
        pcmd == "Go in small room"
        print ("...It is dark....You have a hard time looking for")
        print ("something that could be of help to leave the room....")
        print ("you find a bunch of well organized supplies and packs of what seems bottled water.....")

        pcmd = input ("What a useless choice. What do you do next?: You are frustrated and thirsty, open a bottle and drink, Take the L. Go back to the other room and choose a different path")
        if (pcmd == "open a bottle and drink"):
            print (altEnd)
            altEnd()
        else:
            pcmd = input ("Take the L. Go back")
            print(introStory)
            introStory()

# Main action
def main():
    printGraphic("Title")
    introStory() 

main()