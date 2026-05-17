// Mischievia card pack.
// ageRating: "all" | "teen" | "adult"
// Add, remove, or edit cards here. Claude can safely expand this file.

const mischieviaCards = [
  {
    id: "delivered-from-you",
    ageRating: "teen",
    title: "Delivered From You",
    scenario: "Someone posts: “God really delivered me from what I thought I deserved…” Everyone’s liking it. You know enough context for that caption to feel aimed directly at your forehead.",
    options: [
      {
        label: "A",
        text: "Comment something supportive, knowing it might bother you later.",
        scores: { temptation: 1, gossip: 0, pride: 1, fear: 1, relationships: 1, chaos: 1, growth: 4 },
        mischief: 2,
        breakdown: "You chose maturity with a tiny side of emotional whiplash.",
        roast: "That was growth, but your eye did twitch in lowercase.",
        reflection: "Can you celebrate someone without making their healing about you?"
      },
      {
        label: "B",
        text: "DM them and ask what they meant by that.",
        scores: { temptation: 2, gossip: 1, pride: 2, fear: 2, relationships: 3, chaos: 4, growth: 0 },
        mischief: 7,
        breakdown: "You wanted clarity, but the spirit of messiness was also in the room.",
        roast: "Closure just walked in wearing a fake mustache.",
        reflection: "Were you asking for peace or asking for a doorway back in?"
      },
      {
        label: "C",
        text: "Screenshot it and process it with a close friend.",
        scores: { temptation: 1, gossip: 4, pride: 1, fear: 2, relationships: 2, chaos: 5, growth: 1 },
        mischief: 6,
        breakdown: "You turned a post into a committee meeting.",
        roast: "This is how group chats become crime scenes.",
        reflection: "Are you processing, or are you recruiting emotional backup?"
      },
      {
        label: "D",
        text: "Unfollow quietly and don’t engage.",
        scores: { temptation: 0, gossip: 0, pride: 1, fear: 2, relationships: 1, chaos: 1, growth: 3 },
        mischief: 3,
        breakdown: "You chose distance. Not perfect, but probably peaceful.",
        roast: "A silent unfollow is basically a church clap with boundaries.",
        reflection: "Is this a boundary, or are you avoiding a heart check?"
      }
    ]
  },
  {
    id: "late-night-text",
    title: "You Already Know",
    scenario: "It’s late. Your phone lights up: “Hey… random but I was just thinking about you.” It’s from someone you had a past with, and you’re in a relationship now.",
    options: [
      {
        label: "A",
        text: "Reply casual — “lol what’s up” because you’re curious.",
        scores: { temptation: 5, gossip: 0, pride: 1, fear: 1, relationships: 5, chaos: 6, growth: 0 },
        mischief: 9,
        breakdown: "You opened the door and acted shocked there was a hallway.",
        roast: "Your thumb moved before wisdom got a vote.",
        reflection: "What were you hoping would happen after replying?"
      },
      {
        label: "B",
        text: "Open it, don’t respond, and pretend that counts as discipline.",
        scores: { temptation: 3, gossip: 0, pride: 1, fear: 2, relationships: 2, chaos: 2, growth: 1 },
        mischief: 5,
        breakdown: "You didn’t cross the line, but you stared at it like a museum exhibit.",
        roast: "Not illegal. Spiritually suspicious.",
        reflection: "Why did you need to open it?"
      },
      {
        label: "C",
        text: "Don’t open it at all.",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 1, relationships: 0, chaos: 0, growth: 5 },
        mischief: 0,
        breakdown: "Clean boundary. Boring in the best possible way.",
        roast: "That was mature… suspiciously mature. We’re watching you.",
        reflection: "What helped you choose peace that fast?"
      },
      {
        label: "D",
        text: "Open it, think about replying, then close it.",
        scores: { temptation: 2, gossip: 0, pride: 1, fear: 2, relationships: 1, chaos: 2, growth: 2 },
        mischief: 4,
        breakdown: "You wrestled with it and didn’t lose. That counts.",
        roast: "Your flesh filed an appeal and lost by one vote.",
        reflection: "What would make that choice easier next time?"
      }
    ]
  },
  {
    id: "group-chat-personal",
    title: "Group Chat Gets Personal",
    scenario: "The group chat starts as jokes about someone, then it gets personal. Someone drops private stuff. Everybody is typing. Your screen looks like a small courtroom with memes.",
    options: [
      {
        label: "A",
        text: "Add something small just to keep the joke going.",
        scores: { temptation: 2, gossip: 5, pride: 2, fear: 1, relationships: 4, chaos: 5, growth: 0 },
        mischief: 8,
        breakdown: "You didn’t start the fire, but you definitely brought a scented candle.",
        roast: "Group chat demon activated.",
        reflection: "Were you being funny, or buying approval with someone else’s dignity?"
      },
      {
        label: "B",
        text: "Say nothing but keep reading everything.",
        scores: { temptation: 2, gossip: 3, pride: 0, fear: 2, relationships: 2, chaos: 2, growth: 1 },
        mischief: 5,
        breakdown: "You weren’t loud, but you were subscribed.",
        roast: "Spectator seats are still inside the arena.",
        reflection: "What keeps you watching something you know feels wrong?"
      },
      {
        label: "C",
        text: "Drop a “yo chill” but don’t really stop it.",
        scores: { temptation: 1, gossip: 1, pride: 1, fear: 2, relationships: 1, chaos: 2, growth: 3 },
        mischief: 3,
        breakdown: "You tried. Half-courage is still better than no courage.",
        roast: "That was a speed bump, not a stop sign.",
        reflection: "What would a stronger boundary sound like?"
      },
      {
        label: "D",
        text: "Put your phone down and disengage.",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 1, relationships: 0, chaos: 0, growth: 4 },
        mischief: 1,
        breakdown: "You chose peace over digital bloodsport.",
        roast: "Your phone got spiritually grounded.",
        reflection: "Would stepping away be enough, or should you say something later?"
      }
    ]
  },
  {
    id: "not-gossip-but",
    title: "Not Gossip… But—",
    scenario: "Someone says, “Wait… you know what’s actually going on with them, right?” You do, because someone told you in confidence. They’re waiting.",
    options: [
      {
        label: "A",
        text: "Tell them — “yeah but keep it between us.”",
        scores: { temptation: 3, gossip: 6, pride: 2, fear: 1, relationships: 5, chaos: 6, growth: 0 },
        mischief: 9,
        breakdown: "You turned private information into a community newsletter.",
        roast: "That was not discernment. That was a leak with eyebrows.",
        reflection: "Why did being in-the-know feel worth breaking trust?"
      },
      {
        label: "B",
        text: "Give a vague version without details.",
        scores: { temptation: 2, gossip: 3, pride: 1, fear: 2, relationships: 3, chaos: 3, growth: 1 },
        mischief: 5,
        breakdown: "You tried to be careful while still giving them a trailer.",
        roast: "You released the teaser but called it wisdom.",
        reflection: "Would the person who trusted you feel protected by that answer?"
      },
      {
        label: "C",
        text: "Deflect — “I don’t really know like that.”",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 2, relationships: 0, chaos: 1, growth: 3 },
        mischief: 2,
        breakdown: "You protected the confidence without making a speech.",
        roast: "A humble dodge. Very ninja. Very suspicious.",
        reflection: "Did you deflect because it was wise or because confrontation feels gross?"
      },
      {
        label: "D",
        text: "Pause and say, “I can’t speak on that.”",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 1, relationships: 0, chaos: 0, growth: 5 },
        mischief: 0,
        breakdown: "Clean. Direct. Grown. We hate how responsible that was.",
        roast: "Congratulations, you did not become the town crier.",
        reflection: "How can you make trust your default instead of your exception?"
      }
    ]
  },
  {
    id: "you-good",
    title: "You Good?",
    scenario: "Someone you kinda trust pulls you aside: “You’ve been off lately… you good?” You are, in fact, not good.",
    options: [
      {
        label: "A",
        text: "“Yeah I’m good” — keep it moving.",
        scores: { temptation: 0, gossip: 0, pride: 2, fear: 4, relationships: 2, chaos: 1, growth: 0 },
        mischief: 4,
        breakdown: "You chose the emotional drive-thru answer.",
        roast: "You said ‘I’m good’ with the energy of a phone at 1%.",
        reflection: "What are you afraid would happen if you were honest?"
      },
      {
        label: "B",
        text: "“I’ve been better” — but keep it light.",
        scores: { temptation: 0, gossip: 0, pride: 1, fear: 2, relationships: 1, chaos: 0, growth: 3 },
        mischief: 2,
        breakdown: "You cracked the door open without throwing the whole couch outside.",
        roast: "That was vulnerability in a hoodie.",
        reflection: "Could this person handle a little more truth?"
      },
      {
        label: "C",
        text: "Be real with them.",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 1, relationships: 0, chaos: 0, growth: 5 },
        mischief: 0,
        breakdown: "You let someone see the actual room, not just the front porch.",
        roast: "Look at you, emotionally hydrated.",
        reflection: "What support do you need but haven’t asked for?"
      },
      {
        label: "D",
        text: "Deflect with humor — “just tired lol.”",
        scores: { temptation: 0, gossip: 0, pride: 2, fear: 3, relationships: 2, chaos: 1, growth: 1 },
        mischief: 3,
        breakdown: "You used comedy as a smoke bomb.",
        roast: "That joke had a cry for help wearing sunglasses.",
        reflection: "Where does humor help you, and where does it hide you?"
      }
    ]
  },
  {
    id: "that-post",
    title: "That Post",
    scenario: "Someone from church posts: new job, new relationship, everything clicking. Caption: “God did it again.” You’ve been feeling behind.",
    options: [
      {
        label: "A",
        text: "Scroll and compare your life to theirs.",
        scores: { temptation: 2, gossip: 0, pride: 2, fear: 4, relationships: 1, chaos: 2, growth: 0 },
        mischief: 5,
        breakdown: "You turned their blessing into your scoreboard.",
        roast: "Comparison pulled up a chair and you made it coffee.",
        reflection: "What does their win make you believe about your own timing?"
      },
      {
        label: "B",
        text: "Like it, but feel a way about it.",
        scores: { temptation: 1, gossip: 0, pride: 1, fear: 3, relationships: 1, chaos: 1, growth: 1 },
        mischief: 3,
        breakdown: "You did the public thing while your heart whispered nonsense.",
        roast: "A like with emotional side-eye is still a like.",
        reflection: "Can you be honest with God about the jealousy instead of pretending it’s not there?"
      },
      {
        label: "C",
        text: "Pause and check your mindset.",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 1, relationships: 0, chaos: 0, growth: 5 },
        mischief: 0,
        breakdown: "You interrupted the spiral before it became a full documentary.",
        roast: "Very emotionally responsible. Annoying, but impressive.",
        reflection: "What truth do you need to repeat when comparison hits?"
      },
      {
        label: "D",
        text: "Comment something encouraging.",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 1, relationships: 0, chaos: 0, growth: 4 },
        mischief: 1,
        breakdown: "You chose generosity even while feeling behind.",
        roast: "That was almost too mature. Did someone supervise you?",
        reflection: "How can encouragement loosen jealousy’s grip?"
      }
    ]
  },
  {
    id: "old-habits",
    title: "Same Old You…",
    scenario: "A friend brings up old stories and says, “Bro remember when we used to do ___? Those were the best times.” Part of you misses it.",
    options: [
      {
        label: "A",
        text: "Lean into it — “yeah those were good times.”",
        scores: { temptation: 4, gossip: 0, pride: 1, fear: 1, relationships: 2, chaos: 4, growth: 0 },
        mischief: 7,
        breakdown: "Nostalgia started rewriting the parts that almost wrecked you.",
        roast: "Your past showed up with a highlight reel and no deleted scenes.",
        reflection: "Are you missing the fun, or forgetting the cost?"
      },
      {
        label: "B",
        text: "Laugh and go along with it, but don’t fully engage.",
        scores: { temptation: 2, gossip: 0, pride: 1, fear: 2, relationships: 1, chaos: 2, growth: 1 },
        mischief: 4,
        breakdown: "You stayed close enough to feel the pull but not enough to fully fall in.",
        roast: "You were toe-dipping in the chaos pool.",
        reflection: "What boundary would keep the memory from becoming a doorway?"
      },
      {
        label: "C",
        text: "Shift the convo — “I’m not really on that anymore.”",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 1, relationships: 1, chaos: 0, growth: 5 },
        mischief: 1,
        breakdown: "You named growth without making it weird.",
        roast: "Character development entered the chat.",
        reflection: "Who respects your growth, and who keeps trying to rent space in your old life?"
      },
      {
        label: "D",
        text: "Stay quiet and let the moment pass.",
        scores: { temptation: 1, gossip: 0, pride: 0, fear: 3, relationships: 1, chaos: 1, growth: 2 },
        mischief: 3,
        breakdown: "You avoided feeding it, but silence still left the door unlocked.",
        roast: "That was a boundary written in invisible ink.",
        reflection: "What would you say if you weren’t afraid of making it awkward?"
      }
    ]
  },
  {
    id: "political-post",
    title: "That Post You Didn’t Like",
    scenario: "Someone posts something political or cultural that immediately hits a nerve. Comments are already on fire. Your thumb starts stretching like it’s about to enter a cage match.",
    options: [
      {
        label: "A",
        text: "Jump into the comments and say exactly what you think.",
        scores: { temptation: 2, gossip: 1, pride: 4, fear: 1, relationships: 3, chaos: 6, growth: 0 },
        mischief: 8,
        breakdown: "You entered the digital colosseum with a pool noodle and confidence.",
        roast: "Nobody has ever been healed by paragraph four of a comment war.",
        reflection: "Are you trying to bring truth, or win?"
      },
      {
        label: "B",
        text: "DM them directly about it.",
        scores: { temptation: 1, gossip: 0, pride: 2, fear: 1, relationships: 1, chaos: 2, growth: 3 },
        mischief: 3,
        breakdown: "You chose private conversation over public smoke.",
        roast: "Look at you not turning Facebook into a Waffle House at 2 AM.",
        reflection: "Can you ask questions before assuming motive?"
      },
      {
        label: "C",
        text: "Screenshot it and talk about it with someone else.",
        scores: { temptation: 2, gossip: 4, pride: 3, fear: 1, relationships: 3, chaos: 4, growth: 0 },
        mischief: 7,
        breakdown: "You avoided the fire by starting a smaller fire somewhere else.",
        roast: "A screenshot is gossip with a receipt.",
        reflection: "What did you want the other person to validate?"
      },
      {
        label: "D",
        text: "Scroll past it and don’t engage.",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 1, relationships: 0, chaos: 0, growth: 4 },
        mischief: 1,
        breakdown: "You chose peace without needing everyone to know you chose peace.",
        roast: "Mature silence. Disgusting behavior, honestly.",
        reflection: "When is silence wisdom, and when is it avoidance?"
      }
    ]
  },
  {
    id: "left-out",
    title: "The Invite You Didn’t Get",
    scenario: "You see stories from a hangout you weren’t invited to. Everyone looks happy. Your brain immediately opens a full investigation with no evidence.",
    options: [
      {
        label: "A",
        text: "Post something vague like, “Crazy how people switch up.”",
        scores: { temptation: 2, gossip: 1, pride: 4, fear: 3, relationships: 4, chaos: 6, growth: 0 },
        mischief: 8,
        breakdown: "You chose the fog machine version of conflict.",
        roast: "Passive aggression wore cologne and called it communication.",
        reflection: "What would it look like to ask instead of announce?"
      },
      {
        label: "B",
        text: "Text one friend and ask if everything’s cool.",
        scores: { temptation: 0, gossip: 0, pride: 1, fear: 2, relationships: 1, chaos: 1, growth: 4 },
        mischief: 2,
        breakdown: "You chose direct but not dramatic. Rare species.",
        roast: "Healthy communication? In this economy?",
        reflection: "Can you ask without already deciding the answer?"
      },
      {
        label: "C",
        text: "Mute their stories for a while.",
        scores: { temptation: 1, gossip: 0, pride: 1, fear: 3, relationships: 1, chaos: 1, growth: 2 },
        mischief: 3,
        breakdown: "This might be a boundary, or it might be emotional camouflage.",
        roast: "Peace, but make it stealth mode.",
        reflection: "Are you protecting your heart or avoiding clarity?"
      },
      {
        label: "D",
        text: "Spiral privately and say nothing.",
        scores: { temptation: 1, gossip: 0, pride: 1, fear: 5, relationships: 2, chaos: 2, growth: 0 },
        mischief: 5,
        breakdown: "You let anxiety write the script and cast everyone as villains.",
        roast: "Your imagination needs a budget cut.",
        reflection: "What facts do you actually have?"
      }
    ]
  },
  {
    id: "workplace-drama",
    title: "Workplace Tea",
    scenario: "A coworker whispers, “I probably shouldn’t say this, but…” You already know this sentence comes with free chaos.",
    options: [
      {
        label: "A",
        text: "Lean in. Obviously.",
        scores: { temptation: 3, gossip: 5, pride: 1, fear: 0, relationships: 3, chaos: 5, growth: 0 },
        mischief: 8,
        breakdown: "You accepted the tea before checking if it was poisoned.",
        roast: "Your ears turned into satellite dishes.",
        reflection: "Why does being included in drama feel useful?"
      },
      {
        label: "B",
        text: "Say, “If it’s private, I probably don’t need to know.”",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 1, relationships: 0, chaos: 0, growth: 5 },
        mischief: 0,
        breakdown: "You left the drama unopened like a suspicious email attachment.",
        roast: "HR just felt peace and doesn’t know why.",
        reflection: "How can you make integrity feel normal, not dramatic?"
      },
      {
        label: "C",
        text: "Listen but promise not to repeat it.",
        scores: { temptation: 2, gossip: 4, pride: 1, fear: 1, relationships: 2, chaos: 3, growth: 1 },
        mischief: 6,
        breakdown: "You didn’t spread it, but you still helped it land.",
        roast: "Confidential gossip is still gossip with a little briefcase.",
        reflection: "Does hearing it help anyone?"
      },
      {
        label: "D",
        text: "Change the subject with a joke.",
        scores: { temptation: 0, gossip: 1, pride: 0, fear: 2, relationships: 0, chaos: 1, growth: 3 },
        mischief: 2,
        breakdown: "You dodged the mess without making a scene.",
        roast: "A comedy smoke bomb. Respectable cowardice.",
        reflection: "Could a direct boundary work better next time?"
      }
    ]
  },
  {
    id: "revenge-story",
    title: "The Revenge Story",
    scenario: "Someone hurt you, and now you have the perfect post. Not too obvious. Just obvious enough for the right people to know.",
    options: [
      {
        label: "A",
        text: "Post it. Let the shoe fit whoever’s limping.",
        scores: { temptation: 3, gossip: 2, pride: 5, fear: 1, relationships: 5, chaos: 6, growth: 0 },
        mischief: 9,
        breakdown: "You turned pain into a public scavenger hunt.",
        roast: "That was not healing. That was a subtweet in church clothes.",
        reflection: "What would real repair require that revenge avoids?"
      },
      {
        label: "B",
        text: "Write it in Notes and don’t post it.",
        scores: { temptation: 1, gossip: 0, pride: 1, fear: 2, relationships: 0, chaos: 0, growth: 4 },
        mischief: 1,
        breakdown: "You let the pressure out without setting the room on fire.",
        roast: "The Notes app became your emotional babysitter.",
        reflection: "What did writing reveal that posting would have hidden?"
      },
      {
        label: "C",
        text: "Send it to a friend and ask if it’s too much.",
        scores: { temptation: 2, gossip: 2, pride: 2, fear: 2, relationships: 2, chaos: 3, growth: 1 },
        mischief: 5,
        breakdown: "You outsourced your self-control to someone who may also love drama.",
        roast: "Peer review, but for bad decisions.",
        reflection: "Did you ask the friend who would tell the truth or the one who’d hype the mess?"
      },
      {
        label: "D",
        text: "Pray, cool down, and deal with it privately later.",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 1, relationships: 0, chaos: 0, growth: 5 },
        mischief: 0,
        breakdown: "You delayed reaction long enough for wisdom to get a chair.",
        roast: "Extremely healthy. Frankly, rude to the chaos.",
        reflection: "What does private obedience protect?"
      }
    ]
  },
  {
    id: "dating-boundary",
    title: "Boundary-ish",
    scenario: "You told yourself you had boundaries. Then the person you like says, “Come over, we’ll just chill.” You both know the word “just” is doing Olympic-level gymnastics.",
    options: [
      {
        label: "A",
        text: "Go over. You’ll figure it out.",
        scores: { temptation: 6, gossip: 0, pride: 1, fear: 1, relationships: 4, chaos: 5, growth: 0 },
        mischief: 9,
        breakdown: "You put your boundary in witness protection.",
        roast: "You said you were done, but your hoodie had other plans.",
        reflection: "What situation are you pretending you can manage?"
      },
      {
        label: "B",
        text: "Suggest meeting somewhere public instead.",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 1, relationships: 0, chaos: 0, growth: 5 },
        mischief: 1,
        breakdown: "You protected the vibe without pretending you’re made of stone.",
        roast: "That was wisdom with a calendar invite.",
        reflection: "How can you plan ahead instead of relying on panic discipline?"
      },
      {
        label: "C",
        text: "Go, but tell yourself you’ll leave early.",
        scores: { temptation: 4, gossip: 0, pride: 1, fear: 2, relationships: 3, chaos: 4, growth: 1 },
        mischief: 7,
        breakdown: "You built a boundary out of wet cardboard.",
        roast: "The exit plan was decorative.",
        reflection: "Have you succeeded in that setup before, honestly?"
      },
      {
        label: "D",
        text: "Say no, then overthink whether you ruined everything.",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 4, relationships: 1, chaos: 1, growth: 4 },
        mischief: 2,
        breakdown: "You made a good choice and then anxiety tried to invoice you.",
        roast: "Boundaries with a side of emotional taxes.",
        reflection: "What would it mean if a boundary actually strengthened the connection?"
      }
    ]
  },
  {
    id: "church-volunteer",
    title: "Serving or Showing?",
    scenario: "You volunteer for something at church. Nobody thanks you publicly. Then someone else gets praised for doing half as much. Your face stays holy. Your heart does not.",
    options: [
      {
        label: "A",
        text: "Quietly resent it and keep score.",
        scores: { temptation: 1, gossip: 0, pride: 5, fear: 2, relationships: 2, chaos: 2, growth: 0 },
        mischief: 5,
        breakdown: "You served, then turned it into an invisible invoice.",
        roast: "Your humility requested a receipt.",
        reflection: "Would you still do it if nobody noticed?"
      },
      {
        label: "B",
        text: "Make a joke about never being appreciated.",
        scores: { temptation: 1, gossip: 1, pride: 4, fear: 2, relationships: 3, chaos: 3, growth: 0 },
        mischief: 6,
        breakdown: "The joke had a tiny dagger taped underneath.",
        roast: "Passive aggression brought snacks to ministry.",
        reflection: "What would honest communication sound like without the sarcasm?"
      },
      {
        label: "C",
        text: "Check your motive and keep serving.",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 1, relationships: 0, chaos: 0, growth: 5 },
        mischief: 0,
        breakdown: "You separated obedience from applause.",
        roast: "Annoyingly Christlike. Very inconvenient for the ego.",
        reflection: "What part of you still wants to be seen?"
      },
      {
        label: "D",
        text: "Pull back from serving for a while.",
        scores: { temptation: 1, gossip: 0, pride: 2, fear: 3, relationships: 1, chaos: 1, growth: 2 },
        mischief: 3,
        breakdown: "This might be rest, or it might be wounded pride wearing pajamas.",
        roast: "Sabbath or sulking? The jury is spiritually confused.",
        reflection: "Are you stepping back to heal or to punish?"
      }
    ]
  },
  {
    id: "family-trigger",
    title: "Family Dinner Grenade",
    scenario: "A family member makes that same comment they always make. The one that somehow hits every nerve God installed. Everyone acts like you’re dramatic if you react.",
    options: [
      {
        label: "A",
        text: "Snap back immediately.",
        scores: { temptation: 2, gossip: 0, pride: 4, fear: 1, relationships: 5, chaos: 6, growth: 0 },
        mischief: 8,
        breakdown: "You gave the room exactly the explosion it expected.",
        roast: "The mashed potatoes witnessed violence.",
        reflection: "What did snapping protect, and what did it cost?"
      },
      {
        label: "B",
        text: "Stay calm and say, “I’m not doing this tonight.”",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 1, relationships: 1, chaos: 1, growth: 5 },
        mischief: 1,
        breakdown: "You set a boundary without turning dinner into pay-per-view.",
        roast: "A peaceful adult has entered the chat. Gross.",
        reflection: "What boundary can you prepare before the next gathering?"
      },
      {
        label: "C",
        text: "Laugh it off, then stew about it for three days.",
        scores: { temptation: 1, gossip: 0, pride: 2, fear: 4, relationships: 2, chaos: 2, growth: 0 },
        mischief: 4,
        breakdown: "You avoided conflict and paid for it in emotional interest.",
        roast: "You swallowed the grenade and called it peace.",
        reflection: "What truth needs to be said kindly but clearly?"
      },
      {
        label: "D",
        text: "Leave the room for a minute.",
        scores: { temptation: 0, gossip: 0, pride: 1, fear: 2, relationships: 1, chaos: 0, growth: 4 },
        mischief: 2,
        breakdown: "You gave yourself space before the old version took the wheel.",
        roast: "A tactical retreat. Very emotionally special forces.",
        reflection: "What helps your body calm down before you respond?"
      }
    ]
  },

  // -----------------------------------------------
  // NEW CARDS
  // -----------------------------------------------

  {
    id: "seen-not-responding",
    ageRating: "teen",
    title: "Seen. Not Responding.",
    scenario: "You see the 'Read' receipt under your message. They opened it. Six hours ago. Still nothing. Your brain is now running a full forensic investigation with zero evidence.",
    options: [
      {
        label: "A",
        text: "Text again — \"Hey just checking if you saw this.\"",
        scores: { temptation: 3, gossip: 0, pride: 2, fear: 4, relationships: 4, chaos: 5, growth: 0 },
        mischief: 7,
        breakdown: "You double-texted a ghost and called it accountability.",
        roast: "Your phone just filed a restraining order on your behalf.",
        reflection: "What would waiting actually cost you?",
        verdict: "Spiritually Suspicious."
      },
      {
        label: "B",
        text: "Leave it. They'll reply when they reply.",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 1, relationships: 0, chaos: 0, growth: 4 },
        mischief: 1,
        breakdown: "You let the silence be silence. That's rare energy.",
        roast: "Emotionally unbothered. Probably lying to yourself, but in a healthy direction.",
        reflection: "What story are you resisting writing?",
        verdict: "Saint-ish. Don't Get Cocky."
      },
      {
        label: "C",
        text: "Soft-launch an Instagram story to make them notice you're fine.",
        scores: { temptation: 2, gossip: 0, pride: 4, fear: 3, relationships: 3, chaos: 4, growth: 0 },
        mischief: 6,
        breakdown: "You posted bait with a caption that said 'just vibing.'",
        roast: "That was not peace. That was war in a cute filter.",
        reflection: "Who were you really posting for?",
        verdict: "Messy, but Self-Aware."
      },
      {
        label: "D",
        text: "Assume the worst and emotionally spiral for an hour.",
        scores: { temptation: 1, gossip: 0, pride: 1, fear: 6, relationships: 2, chaos: 3, growth: 0 },
        mischief: 5,
        breakdown: "Your anxiety wrote a whole movie. In 4K. With a sequel.",
        roast: "You were convicted without a trial.",
        reflection: "What evidence do you actually have?",
        verdict: "Messy, but Self-Aware."
      }
    ]
  },

  {
    id: "the-apology",
    ageRating: "teen",
    title: "The Apology You Owe",
    scenario: "You know you owe someone an apology. You've known for weeks. Every time you almost do it, you find a reason to wait.",
    options: [
      {
        label: "A",
        text: "Text a simple apology right now.",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 1, relationships: 0, chaos: 0, growth: 5 },
        mischief: 0,
        breakdown: "You stopped waiting for the perfect moment and just did it.",
        roast: "Character arc unlocked. We weren't ready.",
        reflection: "What had you waiting — pride, or genuine fear of the response?",
        verdict: "Saint Energy. Weirdly Stable."
      },
      {
        label: "B",
        text: "Wait until you feel more prepared.",
        scores: { temptation: 1, gossip: 0, pride: 2, fear: 3, relationships: 2, chaos: 1, growth: 1 },
        mischief: 4,
        breakdown: "Preparation became procrastination wearing a blazer.",
        roast: "You've been 'almost ready' since the first month of the year.",
        reflection: "What specifically needs to be different before you'll do it?",
        verdict: "Mostly Fine. Slight Side-Eye."
      },
      {
        label: "C",
        text: "Do something nice for them instead and call it even.",
        scores: { temptation: 2, gossip: 0, pride: 3, fear: 2, relationships: 3, chaos: 2, growth: 1 },
        mischief: 5,
        breakdown: "You paid the debt in a currency they didn't request.",
        roast: "Buying Venmo credit for an emotional debt.",
        reflection: "Does the other person know they've been 'apologized to'?",
        verdict: "Messy, but Self-Aware."
      },
      {
        label: "D",
        text: "Convince yourself they've probably moved on so it doesn't matter.",
        scores: { temptation: 2, gossip: 0, pride: 4, fear: 2, relationships: 2, chaos: 2, growth: 0 },
        mischief: 6,
        breakdown: "You made peace with yourself while leaving someone else without closure.",
        roast: "The statute of emotional limitations does not apply here.",
        reflection: "Is this release or avoidance?",
        verdict: "Spiritually Suspicious."
      }
    ]
  },

  {
    id: "clout-comment",
    ageRating: "teen",
    title: "Comment Section Temptation",
    scenario: "A viral post has a comment that's almost funny but slightly mean about someone you know. Nobody else will connect the dots. You could add one line and get 40 likes.",
    options: [
      {
        label: "A",
        text: "Drop the line. It's not that deep.",
        scores: { temptation: 3, gossip: 3, pride: 4, fear: 0, relationships: 4, chaos: 5, growth: 0 },
        mischief: 8,
        breakdown: "You traded someone's dignity for forty little thumbs.",
        roast: "Clout paid you in dopamine and dipped.",
        reflection: "Would you say it if they were standing there?",
        verdict: "Sinner-ish. Possibly with Wi-Fi."
      },
      {
        label: "B",
        text: "Write it in the notes app and close the app.",
        scores: { temptation: 2, gossip: 0, pride: 1, fear: 1, relationships: 0, chaos: 0, growth: 3 },
        mischief: 2,
        breakdown: "You got the joke out of your system without doing damage.",
        roast: "Your Notes app has seen some things.",
        reflection: "What do you actually want from validation?",
        verdict: "Saint-ish. Don't Get Cocky."
      },
      {
        label: "C",
        text: "Send it to a friend in DM instead.",
        scores: { temptation: 2, gossip: 4, pride: 2, fear: 1, relationships: 2, chaos: 3, growth: 0 },
        mischief: 5,
        breakdown: "You found a smaller audience. Still an audience.",
        roast: "Private gossip is just gossip with a shorter guest list.",
        reflection: "Are you bonding with someone, or bonding over someone?",
        verdict: "Messy, but Self-Aware."
      },
      {
        label: "D",
        text: "Scroll past. Not your battle.",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 1, relationships: 0, chaos: 0, growth: 4 },
        mischief: 1,
        breakdown: "You withheld the bit. Clean and rare.",
        roast: "You could have gone viral for a day. Instead you chose dignity. Weird.",
        reflection: "What does self-control in small moments build over time?",
        verdict: "Saint-ish. Don't Get Cocky."
      }
    ]
  },

  {
    id: "situationship",
    ageRating: "teen",
    title: "The Situation",
    scenario: "You're in a situationship. Neither of you has named it. You know you like them more than they like you. They just asked, \"What are we?\"",
    options: [
      {
        label: "A",
        text: "Be honest about how you feel, even if it's uncomfortable.",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 2, relationships: 0, chaos: 1, growth: 5 },
        mischief: 1,
        breakdown: "You stepped into the conversation instead of out of it.",
        roast: "Terrifyingly grown of you. We're concerned.",
        reflection: "What would you want them to do if the roles were reversed?",
        verdict: "Saint-ish. Don't Get Cocky."
      },
      {
        label: "B",
        text: "Say \"I don't know\" and change the subject.",
        scores: { temptation: 2, gossip: 0, pride: 1, fear: 4, relationships: 3, chaos: 2, growth: 0 },
        mischief: 5,
        breakdown: "You kicked the conversation under the rug and called it moving on.",
        roast: "The subject changed. The feelings didn't.",
        reflection: "What are you protecting yourself from by staying vague?",
        verdict: "Messy, but Self-Aware."
      },
      {
        label: "C",
        text: "Ask what they mean by it first, to buy time.",
        scores: { temptation: 1, gossip: 0, pride: 2, fear: 3, relationships: 2, chaos: 2, growth: 1 },
        mischief: 4,
        breakdown: "You lobbed it back like an emotional ping pong pro.",
        roast: "Answering a question with a question. A classic stall tactic.",
        reflection: "What answer are you afraid to give?",
        verdict: "Mostly Fine. Slight Side-Eye."
      },
      {
        label: "D",
        text: "Play it cool — \"whatever you want it to be.\"",
        scores: { temptation: 3, gossip: 0, pride: 3, fear: 3, relationships: 4, chaos: 3, growth: 0 },
        mischief: 7,
        breakdown: "You outsourced the definition to someone who asked because they don't know either.",
        roast: "You played chess in a checkers moment and lost both games.",
        reflection: "What do you actually want?",
        verdict: "Spiritually Suspicious."
      }
    ]
  },

  {
    id: "prayer-request-gossip",
    ageRating: "teen",
    title: "Prayer Request or…?",
    scenario: "Someone in your group says, \"Can we pray for [name]? They're going through a lot — I'll fill you in on the details.\" The details were not necessary for prayer.",
    options: [
      {
        label: "A",
        text: "Receive the details and participate in the prayer.",
        scores: { temptation: 2, gossip: 4, pride: 0, fear: 0, relationships: 2, chaos: 3, growth: 0 },
        mischief: 6,
        breakdown: "The prayer was real. The receipt was still gossip.",
        roast: "You attended a prayer meeting with an embedded press conference.",
        reflection: "Could you have prayed without the details?",
        verdict: "Spiritually Suspicious."
      },
      {
        label: "B",
        text: "Gently say, \"We can pray without the specifics.\"",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 2, relationships: 0, chaos: 0, growth: 5 },
        mischief: 0,
        breakdown: "You redirected the group without making it an event.",
        roast: "God of boldness has entered the chat.",
        reflection: "What made you brave enough to say something?",
        verdict: "Saint Energy. Weirdly Stable."
      },
      {
        label: "C",
        text: "Stay quiet and listen to everything.",
        scores: { temptation: 1, gossip: 3, pride: 0, fear: 2, relationships: 1, chaos: 2, growth: 1 },
        mischief: 4,
        breakdown: "You didn't add fuel, but you didn't turn down the heat either.",
        roast: "Passive participation in gossip is still a vote.",
        reflection: "What stops you from redirecting in group settings?",
        verdict: "Mostly Fine. Slight Side-Eye."
      },
      {
        label: "D",
        text: "Change the subject before the details come out.",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 1, relationships: 0, chaos: 1, growth: 4 },
        mischief: 1,
        breakdown: "You didn't even let the gossip get out of the car.",
        roast: "Spiritual bouncer energy. Respectfully.",
        reflection: "How can you protect others' privacy without making things weird?",
        verdict: "Saint-ish. Don't Get Cocky."
      }
    ]
  },

  {
    id: "fake-account",
    ageRating: "teen",
    title: "The Anonymous Account",
    scenario: "You find out someone made an anonymous account to post shade about your friend group. You know exactly who it is. Nobody else does yet.",
    options: [
      {
        label: "A",
        text: "Screenshot the account and drop it in the group chat.",
        scores: { temptation: 2, gossip: 5, pride: 3, fear: 1, relationships: 4, chaos: 6, growth: 0 },
        mischief: 9,
        breakdown: "You lit the fuse and called it justice.",
        roast: "Chaos got a group notification.",
        reflection: "What outcome were you actually hoping for?",
        verdict: "Sinner-ish. Possibly with Wi-Fi."
      },
      {
        label: "B",
        text: "Talk to the person directly, one-on-one.",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 2, relationships: 1, chaos: 0, growth: 5 },
        mischief: 1,
        breakdown: "You went to the source. Mature, brave, slightly terrifying.",
        roast: "Matthew 18 has entered the group chat.",
        reflection: "What were you hoping they would say?",
        verdict: "Saint Energy. Weirdly Stable."
      },
      {
        label: "C",
        text: "Tell one trusted person to see what they think you should do.",
        scores: { temptation: 1, gossip: 3, pride: 1, fear: 2, relationships: 1, chaos: 2, growth: 2 },
        mischief: 4,
        breakdown: "You outsourced the decision while still spreading the information.",
        roast: "Consulting before gossiping is still gossiping with a disclaimer.",
        reflection: "Did you need advice, or validation?",
        verdict: "Mostly Fine. Slight Side-Eye."
      },
      {
        label: "D",
        text: "Block the account and move on without saying anything.",
        scores: { temptation: 0, gossip: 0, pride: 1, fear: 2, relationships: 0, chaos: 0, growth: 3 },
        mischief: 2,
        breakdown: "You stepped over the landmine and left it for someone else to find.",
        roast: "Not wrong. Just incomplete.",
        reflection: "Does ignoring it protect the group, or just protect your peace?",
        verdict: "Mostly Fine. Slight Side-Eye."
      }
    ]
  },

  {
    id: "oversharing",
    ageRating: "teen",
    title: "Too Much, Too Fast",
    scenario: "You just met someone new. The conversation is going great. You feel safe. Three minutes later you've shared something you normally tell nobody.",
    options: [
      {
        label: "A",
        text: "Keep going — they seem trustworthy.",
        scores: { temptation: 2, gossip: 0, pride: 0, fear: 3, relationships: 4, chaos: 3, growth: 0 },
        mischief: 5,
        breakdown: "You handed someone a key to your house on the first meeting.",
        roast: "Trust is not the same as familiarity.",
        reflection: "Were you connecting, or outsourcing emotional weight?",
        verdict: "Messy, but Self-Aware."
      },
      {
        label: "B",
        text: "Catch yourself and pump the brakes.",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 1, relationships: 0, chaos: 0, growth: 4 },
        mischief: 1,
        breakdown: "You noticed the pattern while you were still in it. Rare.",
        roast: "Self-awareness called ahead of schedule.",
        reflection: "What were you hoping sharing that would get you?",
        verdict: "Saint-ish. Don't Get Cocky."
      },
      {
        label: "C",
        text: "Overshare and then feel weird about it for a week.",
        scores: { temptation: 1, gossip: 0, pride: 1, fear: 4, relationships: 2, chaos: 2, growth: 0 },
        mischief: 5,
        breakdown: "You left the emotional oven on and couldn't stop thinking about it.",
        roast: "You played the tape forward. At 2 AM. Repeatedly.",
        reflection: "What would have happened if you had waited one more conversation?",
        verdict: "Messy, but Self-Aware."
      },
      {
        label: "D",
        text: "Laugh it off and pretend it didn't happen.",
        scores: { temptation: 0, gossip: 0, pride: 2, fear: 2, relationships: 1, chaos: 1, growth: 1 },
        mischief: 3,
        breakdown: "You covered the vulnerability with humor and hoped nobody noticed the smoke.",
        roast: "Comedy as emotional spackle.",
        reflection: "What would it look like to own it instead of erase it?",
        verdict: "Mostly Fine. Slight Side-Eye."
      }
    ]
  },

  {
    id: "comparison-spiral",
    ageRating: "teen",
    title: "The Algorithm Knows",
    scenario: "The algorithm just served you a person your age who has everything you want — the career, the life, the aesthetic. You've been on their page for 17 minutes.",
    options: [
      {
        label: "A",
        text: "Keep scrolling. It's motivating.",
        scores: { temptation: 3, gossip: 0, pride: 2, fear: 5, relationships: 1, chaos: 3, growth: 0 },
        mischief: 6,
        breakdown: "You called comparison fuel and used it to run on fumes.",
        roast: "Motivation has a twin called resentment. You met them both.",
        reflection: "Are you inspired or increasingly convinced you're behind?",
        verdict: "Spiritually Suspicious."
      },
      {
        label: "B",
        text: "Close the app and do something you actually want to work toward.",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 1, relationships: 0, chaos: 0, growth: 5 },
        mischief: 0,
        breakdown: "You redirected the energy. That's the whole thing.",
        roast: "You left the page. And got back to being a person.",
        reflection: "What would 17 minutes on your own goals look like?",
        verdict: "Saint Energy. Weirdly Stable."
      },
      {
        label: "C",
        text: "Like three posts to assert you're not threatened.",
        scores: { temptation: 1, gossip: 0, pride: 3, fear: 3, relationships: 0, chaos: 2, growth: 0 },
        mischief: 4,
        breakdown: "You gave them engagement to prove you weren't jealous.",
        roast: "That's not generosity. That's pride in a cardigan.",
        reflection: "Who were you performing composure for?",
        verdict: "Mostly Fine. Slight Side-Eye."
      },
      {
        label: "D",
        text: "Screenshot to show a friend and unpack why it bothers you.",
        scores: { temptation: 1, gossip: 2, pride: 1, fear: 2, relationships: 1, chaos: 1, growth: 3 },
        mischief: 3,
        breakdown: "You processed it out loud. That's either growth or gossip, depending on the friend.",
        roast: "The screenshot was the tell.",
        reflection: "What are you actually unpacking?",
        verdict: "Mostly Fine. Slight Side-Eye."
      }
    ]
  },

  {
    id: "forgiveness",
    ageRating: "teen",
    title: "The Unforgiven",
    scenario: "Someone who hurt you badly two years ago has shown up visibly changed. Everyone around you says you should let it go. You're not there yet.",
    options: [
      {
        label: "A",
        text: "Fake it publicly and hold the weight privately.",
        scores: { temptation: 1, gossip: 0, pride: 2, fear: 3, relationships: 3, chaos: 2, growth: 0 },
        mischief: 5,
        breakdown: "You performed forgiveness and called it done.",
        roast: "Forgiveness theater has opened its third season.",
        reflection: "Who is the unforgiveness really hurting at this point?",
        verdict: "Messy, but Self-Aware."
      },
      {
        label: "B",
        text: "Tell someone you trust that you're still processing it.",
        scores: { temptation: 0, gossip: 1, pride: 0, fear: 1, relationships: 0, chaos: 0, growth: 4 },
        mischief: 2,
        breakdown: "You told the truth about where you actually are.",
        roast: "Honest beats holy. Growth respects honesty.",
        reflection: "What would real forgiveness change in you, not in them?",
        verdict: "Saint-ish. Don't Get Cocky."
      },
      {
        label: "C",
        text: "Bring up what they did in conversation to remind everyone.",
        scores: { temptation: 2, gossip: 3, pride: 3, fear: 1, relationships: 4, chaos: 5, growth: 0 },
        mischief: 8,
        breakdown: "You carried the past into the present and called it honesty.",
        roast: "Your wound just subpoenaed witnesses.",
        reflection: "What would releasing the verdict give you?",
        verdict: "Sinner-ish. Possibly with Wi-Fi."
      },
      {
        label: "D",
        text: "Acknowledge the growth, even if you haven't forgiven yet.",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 2, relationships: 0, chaos: 0, growth: 5 },
        mischief: 1,
        breakdown: "You didn't pretend. You didn't punish. You observed.",
        roast: "That was emotionally intelligent. Annoying, but impressive.",
        reflection: "Does forgiveness have to arrive all at once?",
        verdict: "Saint-ish. Don't Get Cocky."
      }
    ]
  },

  {
    id: "screenshot-culture",
    ageRating: "teen",
    title: "Screenshot Ready",
    scenario: "Your phone has a screenshot of a private conversation that would 100% go viral. Nobody sent it to you to keep it private.",
    options: [
      {
        label: "A",
        text: "Send it to your three closest friends because they're trustworthy.",
        scores: { temptation: 2, gossip: 5, pride: 2, fear: 0, relationships: 3, chaos: 5, growth: 0 },
        mischief: 8,
        breakdown: "Three people is not a vault. Three people is a beta launch.",
        roast: "Confidentiality has a subscriber minimum and you exceeded it.",
        reflection: "Would you want them to do this with something about you?",
        verdict: "Sinner-ish. Possibly with Wi-Fi."
      },
      {
        label: "B",
        text: "Delete it without sending it.",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 0, relationships: 0, chaos: 0, growth: 5 },
        mischief: 0,
        breakdown: "You chose trust over content. Highest tier behavior.",
        roast: "You could've had drama but you chose integrity. Unexplainable.",
        reflection: "What is the cost of holding information someone trusted you with?",
        verdict: "Saint Energy. Weirdly Stable."
      },
      {
        label: "C",
        text: "Hold onto it just in case you need it later.",
        scores: { temptation: 2, gossip: 2, pride: 2, fear: 2, relationships: 2, chaos: 3, growth: 0 },
        mischief: 6,
        breakdown: "You turned trust into leverage. That's not protection, that's a trap.",
        roast: "The receipt is in your camera roll. And so is your character.",
        reflection: "What situation are you preparing for?",
        verdict: "Spiritually Suspicious."
      },
      {
        label: "D",
        text: "Go back to the person it's about and tell them you have it.",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 2, relationships: 0, chaos: 1, growth: 5 },
        mischief: 1,
        breakdown: "You chose loyalty over leverage. Rare move.",
        roast: "Trust just got a text back for once.",
        reflection: "What made that feel like the right call?",
        verdict: "Saint Energy. Weirdly Stable."
      }
    ]
  },

  {
    id: "drunk-text-adjacent",
    ageRating: "adult",
    title: "The 11:57 PM Decision",
    scenario: "You're at a social event. You're fine, but someone there just said something that sent you spiraling. You have your ex's number, an opinion, and a phone with full battery.",
    options: [
      {
        label: "A",
        text: "Send the text. Real talk, no regrets.",
        scores: { temptation: 5, gossip: 0, pride: 2, fear: 0, relationships: 5, chaos: 7, growth: 0 },
        mischief: 9,
        breakdown: "You reactivated a closed case at midnight with no legal counsel.",
        roast: "Your phone should have a breathalyzer for emotions.",
        reflection: "What do you actually want from this conversation?",
        verdict: "Sinner-ish. Possibly with Wi-Fi."
      },
      {
        label: "B",
        text: "Put your phone in your bag and re-evaluate tomorrow.",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 1, relationships: 0, chaos: 0, growth: 5 },
        mischief: 0,
        breakdown: "You chose tomorrow's peace over tonight's chaos. Excellent.",
        roast: "Your future self just exhaled.",
        reflection: "What triggered the impulse?",
        verdict: "Saint Energy. Weirdly Stable."
      },
      {
        label: "C",
        text: "Type it out and save it as a draft.",
        scores: { temptation: 2, gossip: 0, pride: 1, fear: 1, relationships: 1, chaos: 1, growth: 3 },
        mischief: 3,
        breakdown: "The draft folder is your conscience's waiting room.",
        roast: "Somewhere between saint and sinner there is a Notes app.",
        reflection: "What would reading that draft sober reveal?",
        verdict: "Mostly Fine. Slight Side-Eye."
      },
      {
        label: "D",
        text: "Tell a friend at the party and let them talk you out of it.",
        scores: { temptation: 1, gossip: 2, pride: 1, fear: 2, relationships: 1, chaos: 2, growth: 2 },
        mischief: 4,
        breakdown: "You outsourced your willpower. Not ideal, but sometimes correct.",
        roast: "Friends don't let friends text exes after 11 PM. Good friend.",
        reflection: "What do you need in this moment that isn't a text back?",
        verdict: "Mostly Fine. Slight Side-Eye."
      }
    ]
  },

  {
    id: "people-pleasing",
    ageRating: "teen",
    title: "The Yes You Can't Take Back",
    scenario: "You said yes to something because you were afraid to say no. Now the date is coming up and every part of you dreads it.",
    options: [
      {
        label: "A",
        text: "Show up and hate every second of it.",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 5, relationships: 1, chaos: 1, growth: 0 },
        mischief: 3,
        breakdown: "You martyred yourself and called it loyalty.",
        roast: "You smiled through something you could have just rescheduled.",
        reflection: "What made the word 'no' feel impossible?",
        verdict: "Mostly Fine. Slight Side-Eye."
      },
      {
        label: "B",
        text: "Cancel with a vague excuse.",
        scores: { temptation: 1, gossip: 0, pride: 1, fear: 3, relationships: 2, chaos: 2, growth: 1 },
        mischief: 4,
        breakdown: "You backed out but gave them a cover story instead of truth.",
        roast: "A lie is sometimes easier until it becomes a habit.",
        reflection: "What would an honest cancel actually sound like?",
        verdict: "Mostly Fine. Slight Side-Eye."
      },
      {
        label: "C",
        text: "Be honest — \"I said yes before I thought it through. Can we reschedule?\"",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 2, relationships: 0, chaos: 0, growth: 5 },
        mischief: 1,
        breakdown: "You told the truth with kindness. That's the whole assignment.",
        roast: "Honest adults are terrifying and we respect it.",
        reflection: "What would you say next time before you say yes?",
        verdict: "Saint-ish. Don't Get Cocky."
      },
      {
        label: "D",
        text: "Go but spend the whole time on your phone.",
        scores: { temptation: 1, gossip: 0, pride: 1, fear: 3, relationships: 3, chaos: 2, growth: 0 },
        mischief: 5,
        breakdown: "You showed up technically but checked out spiritually.",
        roast: "Body present. Soul at home eating leftovers.",
        reflection: "Who are you protecting with half-presence?",
        verdict: "Messy, but Self-Aware."
      }
    ]
  },

  {
    id: "recovery-relapse-moment",
    ageRating: "teen",
    title: "Old Pull",
    scenario: "You've been doing really well. Then life hits and the old habit shows up in your brain like it never left. You're not in crisis. You're just close.",
    options: [
      {
        label: "A",
        text: "Call someone in your corner before it gets louder.",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 1, relationships: 0, chaos: 0, growth: 5 },
        mischief: 0,
        breakdown: "You used your support system before you needed rescue. That's how it works.",
        roast: "Growth just called shotgun.",
        reflection: "Who in your life is that person for you?",
        verdict: "Saint Energy. Weirdly Stable."
      },
      {
        label: "B",
        text: "White-knuckle it alone and hope the feeling passes.",
        scores: { temptation: 2, gossip: 0, pride: 2, fear: 3, relationships: 0, chaos: 1, growth: 1 },
        mischief: 4,
        breakdown: "Strength alone can last only so long before the arm gets tired.",
        roast: "Solitary heroism is how people stay stuck.",
        reflection: "What does asking for help cost you?",
        verdict: "Mostly Fine. Slight Side-Eye."
      },
      {
        label: "C",
        text: "Give in just this once — you've been strong for months.",
        scores: { temptation: 6, gossip: 0, pride: 2, fear: 2, relationships: 1, chaos: 4, growth: 0 },
        mischief: 8,
        breakdown: "The streak had a funeral you didn't plan for.",
        roast: "\"Just once\" is one of the most expensive phrases in the language.",
        reflection: "What does the old pattern promise that it can't deliver?",
        verdict: "Sinner-ish. Possibly with Wi-Fi."
      },
      {
        label: "D",
        text: "Identify what triggered it and write it down.",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 1, relationships: 0, chaos: 0, growth: 5 },
        mischief: 1,
        breakdown: "You named the thing before it named you.",
        roast: "That was not passive. That was an act of war against the pattern.",
        reflection: "What does the trigger reveal about what you actually need?",
        verdict: "Saint-ish. Don't Get Cocky."
      }
    ]
  },

  {
    id: "cancel-watch",
    ageRating: "teen",
    title: "The Pile-On",
    scenario: "Someone you kind of know is getting dragged online. Half the things being said are probably true. Half might not be. The comment section is already a verdict.",
    options: [
      {
        label: "A",
        text: "Join in — the receipts speak for themselves.",
        scores: { temptation: 3, gossip: 4, pride: 3, fear: 0, relationships: 2, chaos: 6, growth: 0 },
        mischief: 9,
        breakdown: "You joined a trial that hadn't finished gathering evidence.",
        roast: "Jury duty was not supposed to happen in your timeline.",
        reflection: "What does participating in this give you?",
        verdict: "Sinner-ish. Possibly with Wi-Fi."
      },
      {
        label: "B",
        text: "Watch but don't engage.",
        scores: { temptation: 1, gossip: 2, pride: 0, fear: 1, relationships: 0, chaos: 1, growth: 1 },
        mischief: 4,
        breakdown: "You were present at the scene but didn't touch the evidence.",
        roast: "Spectator seats are still inside the colosseum.",
        reflection: "Is silent observation of harm the same as endorsing it?",
        verdict: "Mostly Fine. Slight Side-Eye."
      },
      {
        label: "C",
        text: "Step away from the conversation entirely.",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 1, relationships: 0, chaos: 0, growth: 4 },
        mischief: 1,
        breakdown: "You declined the invitation to the pile.",
        roast: "Wisdom exited the app without a speech.",
        reflection: "What do you lose by not having an opinion on everything?",
        verdict: "Saint-ish. Don't Get Cocky."
      },
      {
        label: "D",
        text: "Say publicly that you think people should wait for the full story.",
        scores: { temptation: 1, gossip: 0, pride: 2, fear: 2, relationships: 0, chaos: 2, growth: 4 },
        mischief: 3,
        breakdown: "You called for due process on the internet. Bold.",
        roast: "They'll come for you next. Brave.",
        reflection: "What's the cost of defending nuance when the crowd has already decided?",
        verdict: "Mostly Fine. Slight Side-Eye."
      }
    ]
  },

  {
    id: "church-politics",
    ageRating: "teen",
    title: "The Church Beef",
    scenario: "There's drama at church. Leadership decisions, sides forming, people leaving. Someone asks you directly: \"Who do you think is right?\"",
    options: [
      {
        label: "A",
        text: "Give your honest take — someone has to say it.",
        scores: { temptation: 1, gossip: 2, pride: 4, fear: 0, relationships: 3, chaos: 5, growth: 0 },
        mischief: 7,
        breakdown: "You picked a lane in a church parking lot argument. Historical.",
        roast: "The Holy Spirit is watching with concern and popcorn.",
        reflection: "Are you speaking from conviction or from team loyalty?",
        verdict: "Spiritually Suspicious."
      },
      {
        label: "B",
        text: "Say \"I don't have enough information to take a side.\"",
        scores: { temptation: 0, gossip: 0, pride: 0, fear: 2, relationships: 0, chaos: 0, growth: 4 },
        mischief: 1,
        breakdown: "You named your limit. That's wisdom, not avoidance.",
        roast: "Agnostic about church drama. Respectable.",
        reflection: "Is there a way to support people without endorsing the conflict?",
        verdict: "Saint-ish. Don't Get Cocky."
      },
      {
        label: "C",
        text: "Give a vague diplomatic answer that satisfies nobody.",
        scores: { temptation: 0, gossip: 1, pride: 1, fear: 3, relationships: 2, chaos: 2, growth: 1 },
        mischief: 3,
        breakdown: "You tried to be Swiss but ended up just being unclear.",
        roast: "Diplomacy has a failure mode and you found it.",
        reflection: "What would a clear, kind answer actually sound like?",
        verdict: "Mostly Fine. Slight Side-Eye."
      },
      {
        label: "D",
        text: "Turn the question back — \"What's your take?\"",
        scores: { temptation: 0, gossip: 1, pride: 1, fear: 2, relationships: 1, chaos: 1, growth: 2 },
        mischief: 3,
        breakdown: "You handed the microphone back. Classic deflection or genuine curiosity — hard to know.",
        roast: "Not illegal. Mildly suspicious.",
        reflection: "Were you curious or buying time?",
        verdict: "Mostly Fine. Slight Side-Eye."
      }
    ]
  }
];

// Apply default ageRating to any card that doesn't have one
mischieviaCards.forEach(card => {
  if (!card.ageRating) card.ageRating = "teen";
});

