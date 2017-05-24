// ==UserScript==
// @name           Pardus Chat Utility
// @version        1.5
// @namespace      coawyn@gmail.com
// @description    Adds features to chat such as ignore, important, and custom smilies.
// @homepage       http://unique.hobby-site.com/
// @include        http://chat.pardus.at/chattext.php*
// @include        https://chat.pardus.at/chattext.php*
// ==/UserScript==
// Clickable hyperlinks thanks to Ratchetfreak!
//
// Main credit goes to the original authors, above.
// I think this used to make people utter song lyrics.
// Customised it to make annoying people utter more interesting things.
//
var hijack = function(){
	var namesImportant = new Array();
	namesImportant.push("Arkoan");

   // List of people to quieten goes here.
   // Just duplicate the namesToIgnore.push(...) line and amend the name for as many people you like.
	var namesToIgnore = new Array();
	var removeLinesOfThoseIgnored = false;  // false => replace their chat, true => remove them altogether.
  	namesToIgnore.push("Admiral James Kelly");

   // List of people to rename (e.g., rename someone back to a more familiar name)
   // Just duplicate the pair: idToRename.push(...) ; nameRenamed.push(...) lines and amend accordingly.
	var idToRename = new Array();
	var nameRenamed = new Array();
	idToRename.push(177063); nameRenamed.push("Big Jaws"); // "Jaws" -> "Way Bigger Jaws"






   //
   // No need to modify anything below here.
   //
	var chatWnd = document.getElementById("ChatWnd");
	var chatDivCount = 1;

	var originalDecodeString = window.decodeString;
	window.decodeString = function(str){
		str = str.replace(/(?!")(\bhttp:\/\/[\w%&=?#.+/;]*\b)(?=\s)/g, '<a href="$1" target="_blank">$1</a>');
		str = str.replace(/:facepalm:/g, "<img src='http://unique.hobby-site.com/Facepalm.gif' style='vertical-align:middle' alt=''>");
		str = str.replace(/:gripe:/g, "<img src='http://unique.hobby-site.com/Gripe.gif' style='vertical-align:middle' alt=''>");
		str = str.replace(/:rant:/g, "<img src='http://unique.hobby-site.com/Rant.gif' style='vertical-align:middle' alt=''>");
		str = str.replace(/:wall:/g, "<img src='http://unique.hobby-site.com/Wall.gif' style='vertical-align:middle' alt=''>");
		str = str.replace(/:welt:/g, "<img src='http://unique.hobby-site.com/Welt.jpg' style='vertical-align:middle' alt=''>");
		str = str.replace(/\bFHA\b/g, "<img src='http://unique.hobby-site.com/FHA-Smiley.png' style='vertical-align:middle' alt='FHA'>");
		str = str.replace(/\bIG\b/g, "<img src='http://unique.hobby-site.com/IG-Smiley.png' style='vertical-align:middle' alt='IG'>");
		str = str.replace(/\bTCP\b/g, "<img src='http://unique.hobby-site.com/TCP-Smiley.png' style='vertical-align:middle' alt='TCP'>");
		str = str.replace(/(FSCv\d\.\d\|([\w ]*)(\|\d*)+)/,'<a href="http://pardus.rukh.de/pshipcalc.htm?$1" target="_blank">FSC $2</a>');
		return originalDecodeString(str);
	};



	Array.prototype.indexOf = function(obj) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] == obj) return i;
		}
		return -1;
	}



        // List of quotes.
        var quotes = new Array();
        quotes.push("In Paris they simply stared when I spoke to them in French. I never did succeed in making those idiots understand their language.");
        quotes.push("When everything's coming your way... you're in the wrong lane and going the wrong way.");
        quotes.push("I want to get a tattoo of myself on my entire body, only 2 inches taller.");
        quotes.push("I was going to buy a copy of The Power of Positive Thinking, and then I thought, what good would that do?");
        quotes.push("If it ain't broke, take it apart and fix it.");
        quotes.push("1 kilogram of falling figs == 1 Fig Newton");
        quotes.push("The last time I was inside a woman was when I went to the Statue of Liberty.");
        quotes.push("An Apple a day keeps Windows away.");
        quotes.push("I'm moving to Mars next week, so if you have any boxes, I need them.");
        quotes.push("Nuke the Whales!");
        quotes.push("Remember the tea kettle, though up to its neck in hot water, it continues to sing.");
        quotes.push("Life is full of surprises. Just say \"never\" and you'll see.");
        quotes.push("ARMY: Make it tougher for the enemy to get in, and you can't get out.");
        quotes.push("The most likely way for the world to be destroyed, most experts agree, is by accident. That's where we come in; we're computer professionals. We cause accidents.");
        quotes.push("Ham and Eggs: A day's work for a chicken, a lifetime commitment for a pig.");
        quotes.push("A man's wife is his better half, but his mistress is his better hole.");
        quotes.push("Universal truth: No one knows the origins of their metal coat hangers.");
        quotes.push("Please Tell Your Pants Its Not Polite To Point.");
        quotes.push("Having failed to conquer myself, the best hope now is to arrange an alliance with myself.");
        quotes.push("The hardest thing in life is to do nothing... you never know when your finished.");
        quotes.push("Abandon the search for Truth; settle for a good fantasy.");
        quotes.push("If God is watching us, the least we can do is be entertaining.");
        quotes.push("[Referring to a glass of water]: I mixed this myself. Two parts H, one part O. I don't trust anybody!");
        quotes.push("I misplaced my dictionary...now I'm at a loss for words.");
        quotes.push("Deciding not to choose is still making a choice.");
        quotes.push("Why do kamikaze pilots wear helmets?");
        quotes.push("My grandmother is eighty and still doesn't need glasses... She drinks straight out of the carton.");
        quotes.push("Menstruation, menopause, mental breakdowns... Ever notice how all womens probIems begin with men?");
        quotes.push("Treat everyone with politeness, even those who are rude to you, not because they are nice, but because you are.");
        quotes.push("A ship in harbour is safe, but that is not what ships are built for.");
        quotes.push("ARMY: Shoot first, shoot later, shoot again, then when everyone's dead, try to ask a question or two.");
        quotes.push("To be seventy years young is sometimes far more cheerful and hopeful than to be forty years old.");
        quotes.push("WARNING: The consumption of alcohol may lead you to believe that ex-lovers are really dying for you to telephone them at four in the morning.");
        quotes.push("Did you sleep well? \"No, I made a couple of mistakes.\"");
        quotes.push("I could crush him like an ant. But it would be too easy. No, revenge is a dish best served cold. I'll bide my time.... Oh what the hell. I'll just crush him like an ant.");
        quotes.push("Life's a bitch, 'cause if it was a slut, it'd be easy.");
        quotes.push("Frisbeetarianism is the belief that when you die, your soul goes up on the roof and gets stuck.");
        quotes.push("So many cats, so few recipes.");
        quotes.push("I like work. It fascinates me. I sit and look at it for hours.");
        quotes.push("Girls are like square numbers, if they're under 13 just do them in your head. ");
        quotes.push("I do whatever my Rice Krispies tell me to.");
        quotes.push("Man does not live by words alone, despite the fact that sometimes he has to eat them.");
        quotes.push("Better to ask the way than to go astray");
        quotes.push("Men are like placemats, they only show up when there's food on the table.");
        quotes.push("I always take life with a grain of salt, ...plus a slice of lemon, ...and a shot of tequila.");
        quotes.push("Am I ambivalent? Well, yes and no.");
        quotes.push("What is done now, is influenced by what you did then, and will determine what you do when now is then.");
        quotes.push("It is a miracle that curiosity survives formal education.");
        quotes.push("Cute and interesting are two different things.");
        quotes.push("Better to understand a little than to misunderstand a lot.");
        quotes.push("Roses are #FF0000, violets are #0000FF, all of my base are belong to you.");
        quotes.push("Don't marry a tennis player - love means nothing to them.");
        quotes.push("There are only two times when I drink...when I'm alone or when I'm with someone.");
        quotes.push("9 out of 10 doctors say the 10th doctor should mellow out.");
        quotes.push("Drunk is feeling sophisticated when you can't say it.");
        quotes.push("Middle age is when you still believe you'll feel better in the morning.");
        quotes.push("The real problem concerning your leisure is how to keep other people from using it.");
        quotes.push("I have no problem keeping secrets. It's the people I tell...");
        quotes.push("Girls are like roads, more the curves, more the dangerous they are.");
        quotes.push("The difference between the Pope and your boss. The Pope only expects you to kiss his ring.");
        quotes.push("Ok. I'm gonna need a hammer, a chisel... maybe a couple of rocket launchers. But this pickle jar WILL come open!");
        quotes.push("I'm not schizophrenic! Well, not all of my 500 selves...");
        quotes.push("Few things are more satisfying than seeing your children cope with teenagers of their own!");
        quotes.push("I've done horrifying things with salad tongs. It's really eaten into my social life.");
        quotes.push("Clones are people two.");
        quotes.push("If you just try long enough and hard enough, you can always manage to boot yourself in the posterior.");
        quotes.push("I like kids, but I don't think I could eat a whole one.");
        quotes.push("A good slogan can stop analysis for fifty years.");
        quotes.push("The more things change, the more they stay insane");
        quotes.push("I hate graffiti. In fact, I hate all Italian food.");
        quotes.push("What's the most popular pick up line in Arkansas ? ..... Nice tooth!");
        quotes.push("Doing autopsies is a dying practice.");
        quotes.push("I decided to leave and go to California, so I packed up my Salvador Dali print of two blindfolded dental hygienists trying to make a circle on an Etch-a-Sketch, and I headed for the highway and began hitching. Within three minutes I got picked up by one of those huge trailer trucks carrying 20 brand new cars. I climbed up the side of the cab and opened the door. The guy said, \"I don't have much room up here, why don't you get into one of the cars out back.\" So I did. And he was really into picking people up because he picked up 19 more. We all had our own cars. Then he went 90 miles per hour and we all got speeding tickets.");
        quotes.push("How is it that \"Fat Chance\" and \"Slim Chance\" mean the same thing?");
        quotes.push("My god carries a hammer. Your god died nailed to a tree. Any questions?");
        quotes.push("Give a jackass an education and you get a smartass.");
        quotes.push("I still miss my ex. But my aim is getting better.");
        quotes.push("Lord, so far today I've not been grumpy, selfish, greedy, envious, proud, or angry. I'm really pleased about that. But in a few minutes now, I'm going to get up and from then on I'll probably need a lot more help.");
        quotes.push("If I look confused it's because I'm thinking.");
        quotes.push("At least you're not being rectally probed by aliens.");
        quotes.push("If you're not sure what to do with the ball, just pop it in the net and we'll discuss your options afterwards.");
        quotes.push("A wise schoolteacher sends this note to all parents on the first day of school: \"If you promise not to believe everything your child says happens at school, I'll promise not to believe everything he says happens at home.\"");
        quotes.push("Why do people in ship mutinies always ask for \"better treatment\"? I'd ask for a pinball machine, because with all that rocking back and forth you'd probably be able to get a lot of free games.");
        quotes.push("Our last fight was my fault: My wife asked me \"What's on the TV?\" I said, \"Dust\"");
        quotes.push("Disco is to music what Etch-a-Sketch is to art.");
        quotes.push("What do batteries run on?");
        quotes.push("Money can't buy happiness, but it sure makes misery easier to live with.");
        quotes.push("I only use deodorant under one arm, so I know what I would have smelled like.");
        quotes.push("Hey, you want to go out for pizza and some sex? What, you don't like pizza?");
        quotes.push("Short version of the Serenity Prayer - \"Screw it.\"");
        quotes.push("Warning: Trespassers will be shot");
        quotes.push("If God is watching us, the least we can do is be entertaining.");
        quotes.push("There are two sides to every divorce: Yours and shithead's.");
        quotes.push("Use of unnecessary violence in the apprehension of the Blues Brothers has been approved.");
        quotes.push("Always listen to experts. They'll tell what can't be done and why. Then do it.");
        quotes.push("A teacher observed a boy entering the classroom with dirty hands. She stopped him and said, \"Johnny, please wash your hands. My goodness, what would you say if I came into the room with hands like that?\" With a smile the boy replied, \"I think I'd be too polite to mention it.\"");
        quotes.push("Even a short pencil is more reliable then the longest memory.");
        quotes.push("Everyone is a genius. It's just that some people are too stupid to realize it.");
        quotes.push("He who places head in sand, will get kicked in the end!");
        quotes.push("Love is one long sweet dream... and marriage is the alarm clock.");
        quotes.push("Old soldiers never die. Young ones do.");
        quotes.push("If we don't succeed, we run the risk of failure.");
        quotes.push("If everything seems to be coming your way, you're probably in the wrong lane.");
        quotes.push("You're old when when it takes longer to rest than to get tired.");
        quotes.push("A PBS mind in an MTV world.");
        quotes.push("I'm so old they've cancelled my blood type.");
        quotes.push("It's always easier to see the great personalities in hot chicks.");
        quotes.push("My house is on the median strip of a highway. You don't really notice, except I have to leave the driveway doing 60 MPH.");
        quotes.push("If there is no GOD, who pops up the next Kleenex?");
        quotes.push("Happiness is having a large, loving, caring, close-knit family... in another city. ");
        quotes.push("My wife has a slight impediment in her speech. Every now and then she stops to breathe.");
        quotes.push("I had a friend who was a clown. When he died, all his friends went to the funeral in one car.");
        quotes.push("I say no to drugs. They just don't listen.");
        quotes.push("You will never \"win\" an argument concerning religion.");
        quotes.push("Some girls don't just choose a boyfriend, they pick him.....to pieces.");
        quotes.push("Life is a shit sandwich and on bad days you get no bread.");
        quotes.push("You can get -anywhere- in ten minutes if you drive fast enough.");
        quotes.push("Hallmark Card: \"I've always wanted someone to hold, someone to love. After having met you, I've changed my mind.\"");
        quotes.push("Schizophrenia beats being alone.");
        quotes.push("If vampires have no reflection, how come they have such neat hair?");
        quotes.push("I recently read that love is entirely a matter of chemistry. That must be why my wife treats me like toxic waste.");
        quotes.push("To generalize is to be an idiot.");
        quotes.push("Whatever kind of look you were going for, you missed.");
        quotes.push("National Schizophrenic's Convention: Anybody who's everybody will be there!");
        quotes.push("Leadership is the ability to get men to do what they don't want to do and like it.");
        quotes.push("Crazy people go through the forest by taking take the psycho path.");
        quotes.push("It just doesn't get any Beta than this.");
        quotes.push("Life without you would be like a broken pencil... Pointless.");
        quotes.push("I talk to myself a lot. it bothers people, though, because I use a megaphone.");
        quotes.push("I don't do drugs. I get the same effect just standing up fast.");
        quotes.push("I put contact lenses in my dog's eyes. They had little pictures of cats on them. Then I took one out and he ran around in circles.");
        quotes.push("I like Florida. Everything is in the eighties. The temperatures, the ages, and the IQs.");
        quotes.push("Business truth: The usefulness of any meeting is in inverse proportion to the attendance.");
        quotes.push("Repetition does not establish validity.");
        quotes.push("Jean-Paul Sartre is sitting at a French cafe, revising his draft of Being and Nothingness. He says to the waitress, \"I'd like a cup of coffee, please, with no cream.\" The waitress replies, \"I'm sorry, monsieur, but we're out of cream. How about with no milk?\"");
        quotes.push("Does this rag smell like chloroform to you?");
        quotes.push("You can do more with a kind word and a gun than with just a kind word.");
        quotes.push("Organized crime in America takes in over forty billion dollars a year and spends very little on office supplies.");
        quotes.push("Mortal: a generic pronoun for anyone, invented to solve the 'she/he' issue.");
        quotes.push("The voices held a convention in my head. Anger tied with Jealousy.");
        quotes.push("This will be a memorable month -- no matter how hard you try to forget.");
        quotes.push("I have this nagging suspicion that everyone is out to make me paranoid.");
        quotes.push("After meeting you, I've decided I am in favor of abortion.");
        quotes.push("Guys, you know what the most expensive thing in the world is? A girl that is free for the evening.");
        quotes.push("Teenagers express their burning desires to be different by dressing exactly alike.");
        quotes.push("They change the sheets every day... from one bed to another.");
        quotes.push("Hippopotomonstrosesquippedaliophobia: Fear of long words.");
        quotes.push("If you gave her a penny for her thoughts, you'd get change back.");
        quotes.push("Failure is the only opportunity to begin more intelligently.");
        quotes.push("If you can't say something nice about somebody, then you've come to the right place.");
        quotes.push("That's about as much fun as a game of Marco Polo with Helen Keller.");
        quotes.push("I love men, even though they're lying, cheating scumbags.");
        quotes.push("Always remember that you are absolutely unique. Just like everyone else.");
        quotes.push("Why doesn't DOS ever say \"EXCELLENT command or file name\"?");
        quotes.push("Sacred cows make the best hamburger.");
        quotes.push("Dead owls don't give a hoot.");
        quotes.push("My drinking team has a bowling problem.");
        quotes.push("A good sermon should have a good beginning and a good ending, and they should be as close together as possible.");
        quotes.push("If bankers can count, how come they have eight windows and only four tellers?");
        quotes.push("I don't know how I got over the hill without getting to the top. ");
        quotes.push("Love may be blind but marriage is a real eye-opener.");
        quotes.push("Don't worry about what people think, they don't do it very often.");
        quotes.push("Jell-O is just Kool-Aid with a hard-on.");
        quotes.push("My job is secure. No one else wants it.");
        quotes.push("Man who stands on toilet is high on pot.");
        quotes.push("Two fonts walk into a bar. The bartender says, \"Get out! We don't serve your type here.\"");
        quotes.push("The other night I came home late, and tried to unlock my house with my car keys. I started the house up. So, I drove it around for a while. I was speeding, and a cop pulled me over. He asked where I lived. I said, \"Right here, officer.\"");
        quotes.push("The best thing about living at the beach is that you only have assholes on three sides of you.");
        quotes.push("Losing a husband can be hard: in my case it was almost impossible.");
        quotes.push("Always and never are two words you should always remember never to use.");
        quotes.push("You may have a heart of gold, but so does a hard-boiled egg.");
        quotes.push("Morning people: \"Early to bed and early to rise makes a man healthy, wealthy, and wise.\"");
        quotes.push("Night people: \"Anybody who goes to bed the same day they got up is a quitter.\"");
        quotes.push("Of all the people in the world, you're one of em'.");
        quotes.push("Failure is no more fatal than success is permanent.");
        quotes.push("Sign on a clothing store - Come inside and have a fit.");
        quotes.push("Entropy has us outnumbered.");
        quotes.push("We were born naked, wet and hungry. Then things got worse.");
        quotes.push("Half of a large intestine == 1 semicolon");
        quotes.push("ARMY: When in doubt, empty your magazine.");
        quotes.push("If you think your boss is stupid, remember; you wouldn't have a job if he was any smarter.");
        quotes.push("If you're in a vehicle going the speed of light, what happens when you turn on the headlights?");
        quotes.push("My hometown is so tough, gun shops have \"Back to School\" sales.");
        quotes.push("I've never had premonitions, but I think one day I might.");
        quotes.push("Love is like a rug. You can lay me, walk on me, even take me out and beat me");
        quotes.push("I don't have an attitude problem. You have a perception problem.");
        quotes.push("If those NASA scientists are so smart, why do they all count backwards?");
        quotes.push("My mom said the only reason men are alive is for lawn care and vehicle maintenance.");
        quotes.push("Not one shred of evidence supports the notion that life is serious.");
        quotes.push("Why are they called stairs inside but steps outside?");
        quotes.push("If you want your children to listen to you, try talking softly to someone else.");
        quotes.push("It is far better to be alone, than to wish you were.");
        quotes.push("Are you into casual sex, or should I dress up ?");
        quotes.push("The first half of our lives is ruined by our parents,... and the second half by our children.");
        quotes.push("Yeah, I know, some people are against drunk driving and I call those people 'the cops,' But you know, sometimes you've just got no choice, those kids gotta get to school.");
        quotes.push("Without geometry, life is pointless.");
        quotes.push("Bravery is being the only one who knows you're afraid.");
        quotes.push("Philosophy is a game with objectives and no rules. Mathematics is a game with rules and no objectives.");
        quotes.push("Nothing is fool-proof to a sufficiently talented fool.");
        quotes.push("I may not be the world's greatest lover, but number 2 is not bad!");
        quotes.push("The preacher said \"You always have the lord by your side\" - I was so pleased to be informed of this I ran 20 red lights home! ");
        quotes.push("Do not argue with an idiot. He will drag you down to his level and beat you with experience.");
        quotes.push("I want to die peacefully in my sleep, like my grandfather.. Not screaming and yelling like the passengers in his car.");
        quotes.push("I asked God for a bike, but I know God doesn't work that way. So I stole a bike and asked for forgiveness.");
        quotes.push("Sex is not the answer. Sex is the question. \"Yes\" is the answer.");
        quotes.push("Going to church doesn't make you a Christian any more than standing in a garage makes you a car.");
        quotes.push("We live in a society where pizza gets to your house before the police.");
        quotes.push("Women might be able to fake orgasms. But men can fake a whole relationship.");
        quotes.push("The last thing I want to do is hurt you. But it's still on the list.");
        quotes.push("Light travels faster than sound. This is why some people appear bright until you hear them speak.");
        quotes.push("If I agreed with you we'd both be wrong.");
        quotes.push("Men have two emotions: Hungry and Horny. If you see him without an erection, make him a sandwich.");
        quotes.push("We never really grow up, we only learn how to act in public.");
        quotes.push("War does not determine who is right - only who is left.");
        quotes.push("Knowledge is knowing a tomato is a fruit; Wisdom is not putting it in a fruit salad.");
        quotes.push("Children: You spend the first 2 years of their life teaching them to walk and talk. Then you spend the next 16 years telling them to sit down and shut-up.");
        quotes.push("Politicians and diapers have one thing in common. They should both be changed regularly, and for the same reason.");
        quotes.push("My mother never saw the irony in calling me a son-of-a-bitch.");
        quotes.push("Having sex is like playing bridge. If you don't have a good partner, you'd better have a good hand.");
        quotes.push("The early bird might get the worm, but the second mouse gets the cheese.");
        quotes.push("Evening news is where they begin with 'Good evening', and then proceed to tell you why it isn't.");
        quotes.push("Fighting for peace is like fucking for virginity.");
        quotes.push("If sex is a pain in the ass, then you're doing it wrong...");
        quotes.push("To steal ideas from one person is plagiarism. To steal from many is research.");
        quotes.push("If God is watching us, the least we can do is be entertaining.");
        quotes.push("If 4 out of 5 people SUFFER from diarrhea... does that mean that one enjoys it?");
        quotes.push("If you think nobody cares if you're alive, try missing a couple of payments.");
        quotes.push("Better to remain silent and be thought a fool, than to speak and remove all doubt.");
        quotes.push("How is it one careless match can start a forest fire, but it takes a whole box to start a campfire?");
        quotes.push("A bus station is where a bus stops. A train station is where a train stops. On my desk, I have a work station..");
        quotes.push("Some people are like Slinkies ... not really good for anything, but you can't help smiling when you see one tumble down the stairs.");
        quotes.push("Did you know that dolphins are so smart that within a few weeks of captivity, they can train people to stand on the very edge of the pool and throw them fish?");
        quotes.push("A bank is a place that will lend you money, if you can prove that you don't need it.");
        quotes.push("I thought I wanted a career, turns out I just wanted paychecks.");
        quotes.push("Never, under any circumstances, take a sleeping pill and a laxative on the same night.");
        quotes.push("Whenever I fill out an application, in the part that says \"If an emergency, notify:\" I put \"DOCTOR\". What's my mother going to do?");
        quotes.push("I didn't fight my way to the top of the food chain to be a vegetarian");
        quotes.push("A computer once beat me at chess, but it was no match for me at kick boxing.");
        quotes.push("I didn't say it was your fault, I said I was blaming you.");
        quotes.push("I saw a woman wearing a sweat shirt with \"Guess\" on it...so I said \"Implants?\"");
        quotes.push("The shinbone is a device for finding furniture in a dark room.");
        quotes.push("Why does someone believe you when you say there are four billion stars, but check when you say the paint is wet?");
        quotes.push("The sole purpose of a child's middle name, is so he can tell when he's really in trouble.");
        quotes.push("God must love stupid people. He made SO many.");
        quotes.push("Women will never be equal to men until they can walk down the street with a bald head and a beer gut, and still think they are sexy.");
        quotes.push("Good girls are bad girls that never get caught.");
        quotes.push("Behind every successful man is his woman. Behind the fall of a successful man is usually another woman.");
        quotes.push("Some people say \"If you can't beat them, join them\". I say \"If you can't beat them, beat them\", because they will be expecting you to join them, so you will have the element of surprise.");
        quotes.push("Why do Americans choose from just two people to run for president and 50 for Miss America?");
        quotes.push("Crowded elevators smell different to midgets.");
        quotes.push("You do not need a parachute to skydive. You only need a parachute to skydive twice.");
        quotes.push("The voices in my head may not be real, but they have some good ideas!");
        quotes.push("A clear conscience is usually the sign of a bad memory.");
        quotes.push("The main reason Santa is so jolly is because he knows where all the bad girls live.");
        quotes.push("Laugh at your problems, everybody else does.");
        quotes.push("Never get into fights with ugly people, they have nothing to lose.");
        quotes.push("It's not the fall that kills you; it's the sudden stop at the end.");
        quotes.push("Artificial intelligence is no match for natural stupidity.");
        quotes.push("Always borrow money from a pessimist. He won't expect it back.");
        quotes.push("He who smiles in a crisis has found someone to blame.");
        quotes.push("A diplomat is someone who can tell you to go to hell in such a way that you will look forward to the trip.");
        quotes.push("We have enough gun control. What we need is idiot control.");
        quotes.push("Hospitality: making your guests feel like they're at home, even if you wish they were.");
        quotes.push("My opinions may have changed, but not the fact that I am right.");
        quotes.push("Money can't buy happiness, but it sure makes misery easier to live with.");
        quotes.push("When in doubt, mumble.");
        quotes.push("I discovered I scream the same way whether I'm about to be devoured by a great white shark or if a piece of seaweed touches my foot.");
        quotes.push("I intend to live forever. So far, so good.");
        quotes.push("Women may not hit harder, but they hit lower.");
        quotes.push("A little boy asked his father, \"Daddy, how much does it cost to get married?\" Father replied, \"I don't know son, I'm still paying.\"");
        quotes.push("Worrying works! 90% of the things I worry about never happen.");
        quotes.push("Just remember...if the world didn't suck, we'd all fall off.");
        quotes.push("My psychiatrist told me I was crazy and I said I want a second opinion. He said okay, you're ugly too.");
        quotes.push("Some cause happiness wherever they go. Others whenever they go.");
        quotes.push("Jesus loves you, but everyone else thinks you're an asshole.");
        quotes.push("I don't trust anything that bleeds for five days and doesn't die.");
        quotes.push("I like work. It fascinates me. I sit and look at it for hours.");
        quotes.push("I should've known it wasn't going to work out between my ex-wife and me. After all, I'm a Libra and she's a bitch.");
        quotes.push("I always take life with a grain of salt, ...plus a slice of lemon, ...and a shot of tequila.");
        quotes.push("Never hit a man with glasses. Hit him with a baseball bat.");
        quotes.push("There's a fine line between cuddling and holding someone down so they can't get away.");
        quotes.push("I used to be indecisive. Now I'm not sure.");
        quotes.push("You're never too old to learn something stupid.");
        quotes.push("When tempted to fight fire with fire, remember that the Fire Department usually uses water.");
        quotes.push("You are such a good friend that if we were on a sinking ship together and there was only one life jacket... I'd miss you heaps and think of you often.");
        quotes.push("I got in a fight one time with a really big guy, and he said, \"I'm going to mop the floor with your face.\" I said, \"You'll be sorry.\" He said, \"Oh, yeah? Why?\" I said, \"Well, you won't be able to get into the corners very well.\"");
        quotes.push("Knowledge is power, and power corrupts. So study hard and be evil.");
        quotes.push("Does this rag smell like chloroform to you?");
        quotes.push("With sufficient thrust, pigs fly just fine.");
        quotes.push("To be sure of hitting the target, shoot first and call whatever you hit the target.");
        quotes.push("A bargain is something you don't need at a price you can't resist.");
        quotes.push("Some people hear voices.. Some see invisible people.. Others have no imagination whatsoever.");
        quotes.push("A TV can insult your intelligence, but nothing rubs it in like a computer.");
        quotes.push("If winning isn't everything why do they keep score?");
        quotes.push("Virginity is like a soapbubble, one prick and it is gone.");
        quotes.push("If at first you don't succeed, skydiving is not for you!");
        quotes.push("A bus is a vehicle that runs twice as fast when you are after it as when you are in it.");
        quotes.push("Hallmark Card: \"I'm so miserable without you, it's almost like you're still here.\"");
        quotes.push("Whoever coined the phrase \"Quiet as a mouse\" has never stepped on one.");
        quotes.push("If you are supposed to learn from your mistakes, why do some people have more than one child.");
        quotes.push("Nostalgia isn't what it used to be.");
        quotes.push("How do you get a sweet little 80-year-old lady to say the F word? Get another sweet little 80-year-old lady to yell 'BINGO!' - Unknown");
        quotes.push("When I die, I want to die like my grandfather who died peacefully in his sleep. Not screaming like all the passengers in his car. - Will Rogers");
        quotes.push("Politicians and diapers have one thing in common. They should both be changed regularly, and for the same reason. - José Maria de Eça de Queiroz");
        quotes.push("Nothing sucks more than that moment during an argument when you realize you're wrong - Unknown");
        quotes.push("Knowledge is knowing a tomato is a fruit; Wisdom is not putting it in a fruit salad. - Brian Gerald O'Driscoll");
        quotes.push("Some cause happiness wherever they go; others whenever they go - Oscar Wilde");
        quotes.push("Better to remain silent and be thought a fool, than to speak and remove all doubt. - Abraham Lincoln");
        quotes.push("The shinbone is a device for finding furniture in a dark room. - Unknown");
        quotes.push("The hardest thing in the world to understand is income taxes. - Albert Einstein");
        quotes.push("I don't suffer from insanity; I enjoy every minute of it. - Unknown");
        quotes.push("Patience is something you admire in the driver behind you, but not in one ahead. - Bill McGlashen");
        quotes.push("Women who seek to be equal with men lack ambition. - Marilyn Monroe");
        quotes.push("The only mystery in life is why the kamikaze pilots wore helmets - Al McGuire");
        quotes.push("When I was a boy of fourteen, my father was so ignorant I could hardly stand to have the old man around. But when I got to be twenty-one, I was astonished at how much he had learned in seven years. - Mark Twain");
        quotes.push("Why is the place you drive on is a parkway, and the place you park on is the driveway? - Unknown");
        quotes.push("If you die in an elevator, be sure to push the up button. - Sam Levenson");
        quotes.push("If you think nobody cares if you're alive, try missing a couple of payments. - Earl Wilson");
        quotes.push("Men marry women with the hope they will never change. Women marry men with the hope they will change. Invariably they are both disappointed. - Albert Einstein");
        quotes.push("The quickest way to double your money is to fold it over and put it back in your pocket. - Will Rogers");
        quotes.push("I couldn't repair your brakes, so I made your horn louder. - Steven Wright");
        quotes.push("Before you criticize someone, you should walk a mile in their shoes. That way when you criticize them, you are a mile away from them and you have their shoes. - Jack Handey");
        quotes.push("Children: You spend the first 2 years of their life teaching them to walk and talk. Then you spend the next 16 telling them to sit down and shut-up. - Unknown");
        quotes.push("If evolution is fact, why do mothers only have two hands? - Milton Berle");
        quotes.push("I dream of a better tomorrow, where chickens can cross the road and not be questioned about their motives. - Unknown");
        quotes.push("I am going to call my kids Ctrl, Alt and Delete. Then if they muck up I will just hit them all at once. - Unknown");
        quotes.push("By working faithfully eight hours a day you may eventually get to be boss and work twelve hours a day. - Robert Frost");
        quotes.push("People often say that motivation doesn't last. Well, neither does bathing – that's why we recommend it daily. - Zig Ziglar");
        quotes.push("I asked God for a bike, but I know God doesn't work that way. So I stole a bike and asked for forgiveness. - Emo Philips");
        quotes.push("A bank is a place that will lend you money if you can prove that you don't need it. - Bob Hope");
        quotes.push("A friend is someone who will bail you out of jail. A best friend is the one sitting next to you saying 'boy was that fun.' - The Maugles");
        quotes.push("People who think they know everything are a great annoyance to those of us who do. - Isaac Asimov");
        quotes.push("Why does a woman work ten years to change a man's habits and then complain that he's not the man she married? - Barbra Streisand");
        quotes.push("You want a friend in Washington? Get a dog. - Harry S. Truman");
        quotes.push("We live in a society where pizza gets to your house before the police. - Unknown");
        quotes.push("If I agreed with you we'd both be wrong. - Unknown");
        quotes.push("My mother never saw the irony in calling me a son-of-a-bitch. - Jack Nicholson");
        quotes.push("Having sex is like playing bridge. If you don't have a good partner, you'd better have a good hand. - Woody Allen");
        quotes.push("The early bird might get the worm, but the second mouse gets the cheese. - Unknown");
        quotes.push("Evening news is where they begin with 'Good evening', and then proceed to tell you why it isn't. - Unknown");
        quotes.push("To steal ideas from one person is plagiarism. To steal from many is research. - Wilson Mizner");
        quotes.push("Three words guaranteed to humiliate men everywhere: 'Hold my purse.' - Unknown");
        quotes.push("I didn't fight my way to the top of the food chain to be a vegetarian. - Unknown");
        quotes.push("A computer once beat me at chess, but it was no match for me at kick boxing. - Emo Philips");
        quotes.push("Men have two emotions: hungry and horny. If you see him without an erection, make him a sandwich. - Unknown");
        quotes.push("The sole purpose of a child's middle name, is so he can tell when he's really in trouble. - Unknown");
        quotes.push("Always borrow money from a pessimist. He won't expect it back. - Oscar Wilde");
        quotes.push("Hospitality: making your guests feel like they're at home, even if you wish they were. - Unknown");
        quotes.push("My opinions may have changed, but not the fact that I am right. - Ashleigh Brilliant");
        quotes.push("I discovered I scream the same way whether I'm about to be devoured by a great white shark or if a piece of seaweed touches my foot. - Axel Rose");
        quotes.push("You are such a good friend that if we were on a sinking ship together and there was only one life jacket... I'd miss you heaps and think of you often. - Unknown");
        quotes.push("Why does someone believe you when you say there are four billion stars, but check when you say the paint is wet? - Unknown");
        quotes.push("A bargain is something you don't need at a price you can't resist. - Franklin Jones");
        quotes.push("If at first you don't succeed, skydiving is not for you! - Henny Youngman");
        quotes.push("You know the world is going crazy when the best rapper is a white guy, the best golfer is a black guy, the tallest guy in the NBA is Chinese, the Swiss hold the America's Cup, France is accusing the U.S. of arrogance, Germany doesn't want to go to war, and the three most powerful men in America are named 'Bush', 'Dick', and 'Colon'. - Chris Rock");
        quotes.push("When you go into court, you are putting your fate into the hands of people who weren't smart enough to get out of jury duty. - Norm Crosby");
        quotes.push("The big difference between sex for money and sex for free is that sex for money usually costs a lot less. - Brendan Behan");
        quotes.push("Keep the dream alive: Hit the snooze button. - Unknown");
        quotes.push("A stockbroker urged me to buy a stock that would triple its value every year. I told him, 'At my age, I don't even buy green bananas.' - Claude Pepper");
        quotes.push("I always take life with a grain of salt, ...plus a slice of lemon, ...and a shot of tequila. - Unknown");
        quotes.push("The only way the French are going in is if we tell them we found truffles in Iraq. - Dennis Miller");
        quotes.push("The best argument against democracy is a five-minute conversation with the average voter. - Winston Churchill");
        quotes.push("It's strange, isn't it. You stand in the middle of a library and go 'aaaaagghhhh' and everyone just stares at you. But you do the same thing on an aeroplane, and everyone joins in. - Tommy Cooper");
        quotes.push("Why didn't Noah swat those two mosquitoes? - Unknown");
        quotes.push("The trouble with being punctual is that nobody's there to appreciate it. - Franklin P. Jones");
        quotes.push("I have to exercise early in the morning before my brain figures out what I'm doing. - Unknown");
        quotes.push("God gave us our relatives; thank God we can choose our friends. - Ethel Mumford");
        quotes.push("A graduation ceremony is an event where the commencement speaker tells thousands of students dressed in identical caps and gowns that 'individuality' is the key to success. - Robert Purvis");
        quotes.push("The human brain is a wonderful thing. It starts working the moment you are born, and never stops until you stand up to speak in public. - George Jessel");
        quotes.push("America is a country where half the money is spent buying food, and the other half is spent trying to lose weight. - Unknown");
        quotes.push("Isn't having a smoking section in a restaurant like having a peeing section in a swimming pool? - Unknown");
        quotes.push("Never go to bed angry, stay awake and plot your revenge. - Unknown");
        quotes.push("I'm at the age where I want two girls. In case I fall asleep they will have someone to talk to. - Rodney Dangerfield");
        quotes.push("If aliens are watching us through telescopes, they're going to think the dogs are the leaders of the planet. If you see two life forms, one of them's making a poop, the other one's carrying it for him, who would you assume is in charge? - Jerry Seinfeld");
        quotes.push("isexuality immediately doubles your chances for a date on Saturday night. - Rodney Dangerfield");
        quotes.push("As you get older three things happen. The first is your memory goes, and I can't remember the other two. - Norman Wisdom");
        quotes.push("How is it one careless match can start a forest fire, but it takes a whole box to start a campfire? - Unknown");
        quotes.push("Men reach their sexual peak at eighteen. Women reach theirs at thirty-five. Do you get the feeling that God is playing a practical joke? - Rita Rudner");
        quotes.push("If women ran the world we wouldn't have wars, just intense negotiations every 28 days. - Robin Williams");
        quotes.push("By the time a man realizes that his father was right, he has a son who thinks he's wrong. - Charles Wadsworth");
        quotes.push("A citizen of America will cross the ocean to fight for democracy, but won't cross the street to vote in a national election. - Bill Vaughan");
        quotes.push("To err is human, to blame it on somebody else shows management potential. - Unknown");
        quotes.push("I have enough money to last me the rest of my life, unless I buy something. - Jackie Mason");
        quotes.push("Duct tape is like the force. It has a light side, a dark side, and it holds the universe together. - Oprah Winfrey");
        quotes.push("Money can't buy love, but it improves your bargaining position. - Christopher Marlowe");
        quotes.push("Experience is that marvellous thing that enables you to recognize a mistake when you make it again. - Franklin P. Jones");
        quotes.push("Sometimes the road less traveled is less traveled for a reason. - Jerry Seinfeld");
        quotes.push("Dogs have masters. Cats have staff. - Unknown");
        quotes.push("Why do people keep running over a string a dozen times with their vacuum cleaner, then reach down, pick it up, examine it, then put it down to give their vacuum one more chance? - Unknown");
        quotes.push("It's true hard work never killed anybody, but I figure, why take the chance? - Ronald Reagan");
        quotes.push("A celebrity is someone who works hard all his life to become known and then wears dark glasses to avoid being recognized. - Fred Allen");
        quotes.push("They keep saying the right person will come along, I think mine got hit by a truck. - Unknown");
        quotes.push("See, the problem is that God gives men a brain and a penis, and only enough blood to run one at a time. - Robin Williams");
        quotes.push("First the doctor told me the good news: I was going to have a disease named after me. - Steve Martin");
        quotes.push("I hope that after I die, people will say of me: 'That guy sure owed me a lot of money.' - Jack Handy");
        quotes.push("Never go to a doctor whose office plants have died. - Erma Bombeck");
        quotes.push("ife's disappointments are harder to take when you don't know any swear words. - Unknown");
        quotes.push("The best way to lie is to tell the truth, carefully edited truth. - Unknown");
        quotes.push("At every party there are two kinds of people: those who want to go home and those who don't. The trouble is, they are usually married to each other. - Ann Landers");
        quotes.push("If you do a job too well, you will get stuck with it. - Unknown");
        quotes.push("Make yourself at home... clean my kitchen. - Unknown");
        quotes.push("Anything is easier to take apart than it is to put together.  --Washlevsky's Rule");
        quotes.push("Virtue is just vice at rest. --Gentry's Conclusion");
        quotes.push("The cigarette smoke always drifts in the direction of the non-smoker regardless of the direction of the breeze. --Dhawan's Law for the Non-Smoker");
        quotes.push("The sumptuousness of a company's annual report is in inverse proportion to its profitability that year. --Hale's Rule");
        quotes.push("When the water reaches the upper deck, follow the rats. --Swanson's Law");
        quotes.push("In a bureaucratic hierarchy, the higher up the organization the less people appreciate Murphy's Law. --Rogers's Observation");
        quotes.push("The snapshots you take of your husband are always more flattering than the ones he takes of you. --Murphy's Second Law for Wives");
        quotes.push("Whatever women do, they must do it twice as well as men to be thought half as good. --Whitton's Law");
        quotes.push("Claim victory and retreat. --Aiken's Solution");
        quotes.push("The one wrench or drill bit you need will be the one missing from the tool chest. --First Workshop Principle");
        quotes.push("There is no job so simple that it cannot be done wrong. --Perrussel's Law");
        quotes.push("There is always one more son of a bitch than you counted on. --Kopcha's Rule");
        quotes.push("If you find something you like buy a lifetime supply – they're going to stop making it. --Gerhardt's Law");
        quotes.push("No name, no matter how simple, can be correctly understood over the phone. --Anonymous Murphy's Law");
        quotes.push("When people are free to do as they please, they usually imitate each other. --Hoffer's Law");
        quotes.push("Look around the table; if you don't see a sucker, get up, because you're the sucker. --Slim's Rule");
        quotes.push("No one is listening until you make a mistake. --Vile's Law of Communication");
        quotes.push("Spend sufficient time confirming the need and the need will disappear. --Ed's Fifth Rule of Procrastination");
        quotes.push("'Push' is the force exerted upon the door marked PULL. --Filson's Law");
        quotes.push("1. When in charge ponder; 2. When in trouble delegate; 3. When in doubt mumble. --Boren's Laws for Bureaucrats");
        // End of list of quotes.

        function randomQuote() 
        {
          var randomIndex = Math.floor(Math.random()*(quotes.length));
          return quotes[randomIndex];
        }

	function processChat() {
		var chatDivs = chatWnd.childNodes;
		var chatDivsToDelete = new Array();
		for (; chatDivCount < chatDivs.length; chatDivCount = chatDivCount + 2) {
			var lineDiv = chatDivs[chatDivCount];
			var start = lineDiv.innerHTML.indexOf("profile.php?id=");
			var crop = lineDiv.innerHTML.substring(start+15);
			var profileId = crop.substring(0,crop.indexOf(" ")-1);
			start = crop.indexOf("javascript:sendmsg('");
			crop = crop.substring(start+20);
			var name = crop.substring(0,crop.indexOf("')"));
			if (namesToIgnore.indexOf(name) > -1) {
				if (removeLinesOfThoseIgnored) {
					chatDivsToDelete.push(lineDiv);
				} else {
					  // Set the following variable to
                                          //   true  - to hides the chatter's text from view.
                                          //   false - to replace it with randomly chosen utterings.
                                          var justHideTheOffendingChat = false;

                                          if (justHideTheOffendingChat)
                                          {
					    lineDiv.getElementsByTagName("span")[1].style.color = "#151040";
                                          }
                                          else
                                          {
                                            var ihtml    = lineDiv.getElementsByTagName("span")[1].innerHTML;
                                            var colonPos = ihtml.indexOf(": ");
                                            var newText  = ihtml.substring(0, colonPos + 2) + randomQuote();
                                            lineDiv.getElementsByTagName("span")[1].innerHTML = newText;
                                          }
				}
			} else {
				if (namesImportant.indexOf(name) > -1) {
					lineDiv.getElementsByTagName("span")[1].style.backgroundColor = "#000000";
				}
				if (idToRename.indexOf(profileId) > -1) {
					lineDiv.getElementsByTagName("b")[0].innerHTML = nameRenamed[idToRename.indexOf(profileId)] + "<small> (" + lineDiv.getElementsByTagName("b")[0].innerHTML + ")</small>";
				}
			}
		}
		for(var i = 0; i < chatDivsToDelete.length; i++) {
			chat.removeChild(chatDivsToDelete[i]);
		}
	}



	processChat();

	var originalAjaxCallback = window.ajaxCallback;
	window.ajaxCallback = function(result, errors) {
		originalAjaxCallback(result, errors);
		processChat();
	}

};
var script = document.createElement("script");
script.textContent = "(" + hijack.toString() + ")()";
document.body.appendChild(script);
