// Card generator — run with: node gen_cards.js
const fs = require("fs");

// Seeded random (Mulberry32)
function mulberry32(seed) {
  return function() {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
const rng = mulberry32(11);
function pick(arr) { return arr[Math.floor(rng() * arr.length)]; }
function shuffle(arr) { return [...arr].sort(() => rng() - 0.5); }

const base_cards = [
["Read Receipts","friendship","Your friend texts asking if you are okay. You opened it three hours ago. You were not busy. You were emotionally buffering.","Reply sorry just saw this even though the receipt is sitting there like a courtroom witness.","Ignore it longer and hope time turns into communication.","Reply honestly: I did not know what to say, but I am not doing great.","Send a meme and hope comedy counts as communication.","Time did not fix it. Time just sat there and watched."],
["Gym Selfie Math","comparison","You post a gym selfie. Ten people like it. One specific person does not. That missing like starts doing cardio in your brain.","Check if they viewed your story, then check again because apparently you work for Instagram now.","Tell yourself it does not matter while refreshing like a raccoon with Wi-Fi.","Put the phone down and remember your body is not a scoreboard.","Mute notifications for an hour and act like that was easy.","You became an FBI agent over one missing thumb tap."],
["Accidentally On Purpose","social-media","You open someone's profile just to check something. Now you are 183 weeks deep and know their dog's middle name.","Keep scrolling because archaeology has already begun.","Exit immediately and pretend the Holy Spirit yanked the Wi-Fi.","Close the app and ask yourself what you were actually looking for.","Send the profile to a friend with the message do not judge me.","Bro discovered archaeology."],
["Christian Side-Eye","church-drama","Someone at church says they will be praying for you but the tone feels like it came with subtitles and a tiny dagger.","Tell your friend later and reenact the tone with unnecessary accuracy.","Spend the rest of service decoding it like a prophecy.","Ask calmly what they meant by that.","Smile and say thanks while your inner monologue files a complaint.","The side-eye entered worship."],
["Typing Dots","anxiety","You send something vulnerable. They start typing then stop. Type again then stop. Suddenly three dots have legal authority over your nervous system.","Screenshot it and send it to a friend for emergency analysis.","Stare at the dots until your soul leaves your body.","Put the phone down and let them respond when they are ready.","Send a question mark like that will not make it worse.","Three dots caused a spiritual event."],
["Situationship Olympics","situationship","You ask what you two are. They say they do not really like labels. A weather forecast where a map should be.","Stay because maybe emotional fog eventually becomes a relationship.","Laugh like you are fine and immediately become unwell in the car.","Ask clear questions and decide what you are available for.","Pretend you also hate labels while quietly wanting a whole label maker.","You asked for a map and got a weather forecast."],
["Group Photo Trial","insecurity","You are in a group photo. Everybody looks good. You do not think you do. The zoom feature becomes your enemy and your workplace.","Ask them to delete it and retake everything immediately.","Zoom in for twenty minutes and suffer in HD.","Let it exist and resist turning your face into a federal case.","Ask politely if they can use the other one.","Zooming did not create new confidence."],
["Delivered","dating","You send a risky text. It says Delivered. Five minutes. Ten minutes. Eighteen minutes. Your brain has built a courtroom, a funeral, and a podcast.","Double text with lol nevermind because panic put on shoes.","Check their activity and pretend that is not surveillance with feelings.","Wait and do literally anything else with your life.","Put your phone face-down then flip it back over every nine seconds.","Your brain wrote an entire Netflix series in eighteen minutes."],
["Tagged Without Consent","social-media","Someone tags you in a photo. You did not approve of your face in that photo. The photographer is now on thin ice spiritually.","Untag immediately and text asking why they would post that.","Leave it up but emotionally move to another country.","Ask kindly if they can switch it or remove the tag.","Mute the post and pretend you are above caring.","The photographer became your enemy."],
["Church Parking Lot","church-drama","Service just ended. You see somebody you were hoping to avoid. They see you. The parking lot becomes a spiritual escape room.","Pretend you got a phone call and walk the wrong direction with confidence.","Turn around and inspect a bulletin board like it has classified information.","Say hi, keep it kind, and do not make it weirder than it is.","Give the half-wave and keep moving like your shoes have a calling.","That parking lot became an escape room."],
["Private Prayer Request","gossip","Someone says this is a prayer request not gossip then gives enough detail to start a documentary.","Ask follow-up questions because apparently the prayer needs a timeline.","Listen silently and tell yourself silence means innocence.","Say we can pray without all the details.","Change the subject after the third unnecessary name drop.","That prayer request had a cast list."],
["The Ex's New Person","jealousy","Your ex posts their new person. You are healed. Allegedly. Then the zooming starts and healing leaves the group chat.","Research the new person like you are applying to be their parole officer.","Compare yourself quietly until the whole night gets weird.","Close the app and refuse to audition for pain.","Send one screenshot to a trusted friend and ask them to stop you.","Healing left the group chat."],
["Passive-Aggressive Caption","pride","You have the perfect caption. It is not technically about them. It is absolutely about them. The Lord and everybody with context knows.","Post it and let the shoe fit whoever is limping.","Save it to drafts and reread it like villain poetry.","Delete it and deal with the actual issue privately.","Rewrite it until it sounds inspirational but still suspicious.","That was not healing. That was a subtweet in church clothes."],
["Workplace Tea","workplace","A coworker whispers that they probably should not say this but then the sentence arrives holding a gasoline can.","Lean in. Obviously.","Listen but promise not to repeat it, which is gossip with a little briefcase.","Say that if it is private you probably do not need to know.","Change the subject with a joke and escape sideways.","Your ears turned into satellite dishes."],
["Family Dinner Grenade","family","A family member makes that same comment they always make. Everyone acts like you are dramatic if you react. The mashed potatoes are watching.","Snap back immediately and let dinner become pay-per-view.","Laugh it off and stew about it for three business days.","Say you are not doing this tonight and keep your voice calm.","Leave the room for a minute before the old version of you clocks in.","The mashed potatoes witnessed violence."],
["Left Out Stories","friendship","You see stories from a hangout you were not invited to. Everyone looks happy. Your brain opens an investigation with no evidence.","Post something vague like crazy how people switch up.","Mute everyone and tell yourself you are peaceful not wounded.","Ask one trusted friend if everything is cool.","Spiral privately and say nothing.","Passive aggression wore cologne and called it communication."],
["Accountability Dodgeball","accountability","Someone lovingly calls you out. They are not wrong. Unfortunately your pride has already hired a lawyer.","Defend yourself immediately and bring up three unrelated examples.","Say you hear them while hearing absolutely nothing.","Pause, ask questions, and own the part that is true.","Thank them then process it later once your ego stops yelling.","Your pride hired legal counsel."],
["Old Habit Invite","recovery","Someone from your old life says just come through, it is not even like that anymore. History coughs loudly in the background.","Go because you are sure you can handle it this time.","Say maybe and leave the door cracked.","Say no clearly and call someone safe.","Make up an excuse instead of naming the boundary.","Your boundary put on flip-flops."],
["Cancel Comment Section","cancel-culture","Someone posts a bad take. Comments are on fire. You have a paragraph ready that would absolutely get likes and probably not produce healing.","Jump in and turn the comment section into a cage match.","Screenshot it and roast them somewhere else.","Decide whether a private conversation would help more than public dunking.","Write the comment, delete it, and still feel emotionally sweaty.","Nobody got healed by paragraph four of a comment war."],
["People-Pleasing Yes","people-pleasing","Someone asks for help. You are exhausted. Your mouth says yes before your soul gets a meeting invite.","Say yes and resent them like they forced you.","Ghost the request until it expires socially.","Say you cannot this time without writing a 900-word apology.","Offer a smaller version you can actually handle.","Your mouth accepted a contract your body never signed."],
["Overshare Hangover","oversharing","You told someone way more than you meant to. Now you are replaying the conversation like it is evidence in court.","Text them more to explain the thing you already overshared.","Avoid them for a week and become a hallway ghost.","Let it breathe and remember vulnerability is not automatically a crime.","Send a quick normal message and stop yourself from writing a disclaimer novel.","You tried to solve oversharing with bonus oversharing."],
["Secret Screenshot","secret-screenshots","Someone sends you something spicy in confidence. Your thumb hovers over screenshot like it has a destiny.","Screenshot it and send it to the one friend who will not say anything.","Screenshot it but do not send it, which still feels cursed.","Do not screenshot private trust.","Ask if you can get advice without sharing details.","A screenshot is gossip with a receipt."],
["Angry Reply","anger","Someone texts you sideways. You type a reply so sharp it could cut tile. Your thumb is hovering over send.","Send it exactly as written and let autocorrect witness the crime.","Ignore them forever and call it peace.","Wait, rewrite it calmly, and respond to the issue.","Save it in Notes until your blood pressure returns to Earth.","That text had elbows."],
["School Project Ghost","school","Group project. One person has done nothing. Deadline is tomorrow. They text asking what you need them to do like history did not happen.","Say nothing and then complain to everyone else.","Do their part yourself and silently build resentment furniture.","Give them one clear task and document it.","Tell the teacher privately if they still do not help.","They entered the project during the credits."],
["Dating App Receipt","dating","You see someone from church on a dating app. Their bio says Jesus first but the photos say terms and conditions apply.","Screenshot it and send it to the squad.","Swipe left and judge them for twelve minutes.","Keep it moving because their profile is not your sermon illustration.","Laugh, pray for everybody involved, and close the app.","Their bio and camera roll were in theological disagreement."],
["Forgiveness Receipt","forgiveness","You forgave someone. Then they get praised publicly and your chest says actually we have notes.","Bring up what they did to somebody nearby.","Smile while internally writing a victim impact statement.","Acknowledge the sting without re-opening the whole case.","Take a walk and ask why their praise feels like your loss.","Forgiveness was on paper, but your heart kept the receipt."],
["Fake Friend Radar","friendship","Someone who only texts when they need something says hey bestie. You feel the invoice coming before the request lands.","Reply warmly, help them, then complain about being used.","Leave them on read forever.","Answer kindly but set a limit before saying yes.","Ask what is up and prepare emotionally.","That bestie came with shipping and handling."],
["Clout Charity","pride","You do something genuinely kind. Then part of you wants to post it because apparently generosity needs lighting and a caption.","Post it with a humble caption and cinematic angle.","Do not post it but hope someone else does.","Let the good thing stay between you, them, and God.","Share the cause without centering yourself.","Your humility asked for a ring light."],
["Church Crush","dating","Your church crush is serving coffee. You suddenly need a refill even though your cup is full and your dignity is not.","Walk up three times and pretend caffeine is the issue.","Avoid the entire lobby and call it discernment.","Have one normal conversation like a human being.","Ask a mutual friend too many casual questions.","That was not thirst for coffee."],
["Mood Post","social-media","You feel sad, unseen, and dramatic. The perfect black-screen story with white text is calling your name.","Post people show their true colors and wait for replies.","Draft six versions and emotionally exhaust yourself.","Text one safe person directly instead of broadcasting fog.","Post a song lyric and pretend it is not a flare signal.","The black screen story entered the chat."],
["Apology But Make It Weird","pride","You know you owe an apology. Unfortunately saying you were wrong feels like swallowing a cactus with Wi-Fi.","Send a half-apology that explains why they also messed up.","Wait so long the apology becomes historical fiction.","Own it cleanly without a defense essay.","Write it first then cut the excuses before sending.","That apology had a lawyer attached."],
["Boundary Push","boundaries","You set a boundary. They say wow you have changed. They mean it like a curse. Part of you wants to prove you are still fun.","Drop the boundary to keep the peace.","Shut down completely and disappear.","Say yeah you have changed and keep the boundary.","Explain once then stop negotiating.","Growth got accused of having an attitude."],
["The Last Word","anger","The argument is basically over. But there is one last thing you could say that would absolutely win and absolutely make it worse.","Say it. Victory with collateral damage.","Storm away and slam something nearby.","Let the last word die unemployed.","Say you need a minute before your mouth starts freelancing.","You won the argument and lost the room."],
["Spiritual Comparison","comparison","Someone posts Bible notes, a prayer journal, a worship playlist, and a sunrise devotional. You ate cereal over the sink and called it quiet time.","Compare your faith and feel fake.","Roll your eyes and decide they are probably performative.","Let their discipline encourage you without condemning you.","Save the post and choose one small habit not a full identity makeover.","You turned devotion into CrossFit."],
["Revenge Glow-Up","jealousy","You want to improve yourself. Be honest: part of the motivation is imagining certain people regretting things in cinematic slow motion.","Make the whole glow-up about proving them wrong.","Quit when they stop watching.","Choose growth because you are worth caring for not because they are worth haunting.","Let revenge get you started but do not let it drive the car.","Your healing had a villain soundtrack."],
["Parent Full Name","family","Someone in your family yells your full government name from another room. No context. Just fear in surround sound.","Yell WHAT with matching energy.","Pretend you did not hear and start moving slower than dial-up.","Go ask what is up before anxiety writes a horror movie.","Text am I in trouble from inside the same house.","Your full name activated fight-or-flight."],
["The Prayer You Avoid","temptation","You know exactly what you need to pray about. You also know prayer will make it harder to keep pretending you are confused.","Avoid praying because clarity is inconvenient.","Pray vaguely and leave out the main thing like God does not know.","Name it honestly and ask for help before the next decision.","Text someone accountable first because you need a witness.","You tried to redact a prayer."],
["Influencer Envy","jealousy","Someone your age is succeeding online. They are funny, polished, booked, blessed, and somehow always near good lighting.","Hate-watch their content and call it research.","Decide they are fake so you do not have to feel behind.","Learn what you can without turning their lane into your mirror.","Take one note then log off before envy starts narrating.","Hate-watching is still attendance."],
["Flirt or Ministry","dating","Someone says they just want to encourage you but the messages are arriving with suspicious consistency and too many emojis.","Keep entertaining it because technically nothing happened.","Pretend you do not notice and let it get weirder.","Clarify the boundary before encouragement buys a hoodie.","Reply slower and less warmly while you figure it out.","That ministry had eyelashes."],
["Work Credit Thief","workplace","You did the work. Someone else gets the credit in the meeting. Your smile remains employed. Your soul does not.","Correct them publicly with a little too much seasoning.","Say nothing and become resentful furniture.","Follow up professionally and clarify your contribution.","Ask your manager privately how to handle it.","Your smile was working overtime."],
["Youth Group Legend","church-drama","Someone tells an old embarrassing story about you in front of new people. Everybody laughs. You are laughing too but your spirit is filing paperwork.","Tell one of their embarrassing stories back.","Laugh along and replay it later until 2 AM.","Pull them aside later and say it bothered you.","Joke that the story is retired and redirect.","Your laugh had a hostage note inside it."],
["The Almost Lie","fear","You are late. The real reason is dumb. A better reason appears in your mind wearing a tiny suit.","Lie because it sounds more responsible.","Give a vague answer that lets them assume better things.","Tell the truth simply without over-explaining.","Apologize and skip the details unless asked.","That lie had business casual energy."],
["Friend Dating Disaster","relationships","Your friend is excited about someone. You have heard things but nothing confirmed. You can either protect them, panic them, or start a rumor tornado.","Tell them everything like it is confirmed.","Say nothing and hope wisdom arrives by Bluetooth.","Give a gentle warning and separate fact from rumor.","Try to get more information before saying anything.","You almost turned concern into a documentary."],
["The Compliment Trap","pride","Someone compliments your work. Instead of saying thank you, your brain wants to either downplay it or become unbearable.","Act humble while secretly replaying it all day.","Reject the compliment so hard it becomes awkward.","Say thank you and let it be simple.","Give credit where it is due without erasing your effort.","Receiving a compliment should not require a crisis team."],
["The Unfollow Calculation","social-media","You want to unfollow someone but you know they will notice. Now your thumb is trapped between peace and politics.","Unfollow then check if they noticed.","Keep following and stay annoyed every time they post.","Mute or unfollow based on peace not performance.","Mute first and reassess later.","The unfollow became foreign policy."],
["The Venmo Reminder","friendship","Someone owes you money. It is not a fortune but it is enough to remember. Asking feels awkward. Not asking feels expensive.","Make a public joke about being broke until they get it.","Say nothing and become a martyr over the amount.","Send a simple reminder with no emotional seasoning.","Request it on the app and avoid the speech.","You turned a small amount into a character arc."],
["The Testimony Flex","pride","You share something God did in your life. Then part of you starts checking how people react like grace came with analytics.","Keep refreshing to see who liked it.","Delete it because it did not get enough attention.","Let the testimony stand without needing applause.","Turn notifications off and go live the thing you posted about.","Grace did not ask for engagement metrics."],
["The Boundary Guilt Trip","boundaries","You say no. They say wow I guess I know where I stand. Suddenly your boundary has to fight a guilt dragon.","Take it back and do the thing resentfully.","Over-apologize until your no becomes a maybe.","Say you care about them but your answer is still no.","Repeat the boundary once and stop explaining.","Your no almost got kidnapped."],
["The Sermon Hit Different","spiritual-growth","The message at church is clearly stepping on your shoes. You start thinking of who else needs to hear it instead.","Send the sermon link to someone with no context.","Mentally list everyone else who needs correction.","Ask what God is trying to show you first.","Take notes for yourself before sharing anything.","Conviction knocked and you gave it someone else's address."],
["The Fake Fine","anxiety","Someone asks how you are doing. You are one inconvenience away from becoming soup. Still the word fine is warming up.","Say fine with a smile that looks legally suspicious.","Make a joke and redirect immediately.","Say honestly you are having a rough day.","Say you are okay-ish and let that be enough honesty for now.","You were not fine. You were soup-adjacent."],
["The Group Chat Exit","group-chat","A group chat has become toxic. Leaving will be noticed. Staying means watching people microwave drama daily.","Stay and complain about it in another group chat.","Mute it forever but keep checking like it owes you money.","Leave or set a boundary without making a farewell speech.","Mute it and privately tell one person why.","You moved the drama to a second location."],
["The Receipt Hunt","secret-screenshots","Someone denies saying something. You have screenshots. They are organized. Too organized. Possibly with folders.","Drop the receipts publicly and watch the village burn.","Hold them like emotional ammunition.","Use them only if needed for truth not revenge.","Share privately with the person directly involved.","Your camera roll had a litigation department."],
["The Almost Comeback","recovery","You are tempted to go back to something you left. The memory is edited like a trailer. None of the consequences made the cut.","Text the person or place or habit and call it checking in.","Romanticize it privately until it looks safe.","Tell someone accountable before the feeling makes decisions.","Write down what it actually cost last time.","Your memory hired a dishonest editor."],
["The Better Christian","comparison","Someone seems more disciplined, peaceful, generous, and spiritually mature than you. Your brain considers either admiration or slander.","Assume they are secretly fake so you feel better.","Feel inferior and pull away.","Let their growth inspire yours without making it a competition.","Ask them what helped instead of quietly resenting them.","Their fruit was not an attack."],
["The Tiny Betrayal","friendship","A friend repeats something you told them privately. Not the whole thing but enough. The room tilts a little.","Call them out in front of everyone.","Say nothing and silently demote them forever.","Talk to them privately and explain why it hurt.","Pull back until you know if it was careless or intentional.","Trust got a paper cut."],
["The Comparison Cart","jealousy","Someone has the house, the ring, the job, the vacation, and the aesthetic throw pillows. You have tabs open and a weird feeling.","Buy something you do not need to feel caught up.","Scroll until gratitude needs CPR.","Name what you actually want and what step is yours today.","Close the app and clean one corner of your real life.","Throw pillows became a spiritual attack."],
["The Unsent Paragraph","anger","You typed a paragraph that explains everything, exposes them, corrects their bloodline, and includes punctuation violence.","Send it before wisdom catches up.","Never address it and keep the paragraph as a museum piece.","Rewrite it into three calm sentences.","Sleep on it and decide tomorrow.","That paragraph had a trench coat and thunder."],
["The Soft Launch","dating","Someone soft-launches a relationship online. You recognize the hand in the photo. You absolutely should not care. And yet, here we are.","Compare the hand, sleeve, watch, and background like a detective with unresolved issues.","Pretend you do not care while checking every mutual account.","Let people live without turning clues into custody battles.","Ask one friend if you are being weird. Accept yes as an answer.","You CSI'd a wrist."]
];

const variants = [
  ["", "all", ""],
  ["After Midnight", "teen", " It is way too late, which means every feeling is wearing eyeliner."],
  ["At Church", "all", " This is happening around church people, so everyone is pretending the tension is wearing a cardigan."],
  ["In the Group Chat", "teen", " The group chat is awake, over-caffeinated, and ready to make this worse."],
  ["Grown-Up Edition", "adult", " You have responsibilities in the morning, which somehow makes the bad option look more cinematic."]
];

const stat_map = {
  "dating":"relationships","situationship":"relationships","friendship":"relationships","family":"relationships","relationships":"relationships",
  "workplace":"pride","school":"fear","church-drama":"gossip","group-chat":"gossip","secret-screenshots":"gossip","gossip":"gossip",
  "social-media":"pride","comparison":"fear","jealousy":"pride","insecurity":"fear","people-pleasing":"fear","anxiety":"fear",
  "anger":"chaos","pride":"pride","temptation":"temptation","recovery":"temptation","forgiveness":"pride","boundaries":"fear",
  "cancel-culture":"chaos","oversharing":"fear","accountability":"pride","spiritual-growth":"growth","fear":"fear"
};

const breakdowns = {
  chaos:["You chose the loudest option and called it clarity.","The messy part of you grabbed the steering wheel.","You picked the option with sparks on it and acted surprised by smoke."],
  avoid:["You avoided the hard thing, but the hard thing kept your address.","You chose quiet, but not necessarily peace.","This was less healing and more emotional hiding."],
  healthy:["You chose the option that protects peace without pretending feelings are fake.","You let wisdom be practical instead of dramatic.","You did the mature thing before chaos could put on shoes."],
  middle:["You found a middle lane that could become wisdom if you stay honest.","Not perfect, but it kept the fire department from being called.","This was a small boundary with training wheels."]
};
const reflections = {
  chaos:["What were you hoping this would fix?","Was this about truth, attention, revenge, or relief?","Who gets hurt if this becomes a pattern?"],
  avoid:["What are you afraid would happen if you addressed it directly?","Is this peace, or just delayed honesty?","What conversation are you making future-you handle?"],
  healthy:["What helped you choose the healthier response?","How can you make this kind of choice easier next time?","What boundary or truth is worth protecting here?"],
  middle:["What would move this from almost-wise to actually-wise?","Are you buying time for wisdom or avoiding the real conversation?","What part of this still needs honesty?"]
};
const verdicts = {
  chaos:["Sinner-ish. Wi-Fi enabled.","Spiritually suspicious.","Agent of Chaos energy.","Messy with confidence."],
  avoid:["Avoidant, but not hopeless.","Peace-ish. Side-eye included.","Emotionally buffering.","Not chaos, not quite courage."],
  healthy:["Saint-ish. Don't get cocky.","Growth unlocked.","Weirdly stable.","Mature. Annoying, but good."],
  middle:["Self-aware-ish.","Almost wisdom.","Training wheels growth.","Less messy than expected."]
};

function makeScores(category, kind) {
  const d = {temptation:0,gossip:0,pride:0,fear:0,relationships:0,chaos:0,growth:0};
  const key = stat_map[category] || "chaos";
  if (kind === "chaos") {
    d[key] = Math.min((d[key]||0)+5, 10); d.chaos += 4; d.pride += 2; d.relationships += 2; return [d, 8];
  }
  if (kind === "avoid") {
    d[key] = Math.min((d[key]||0)+2, 10); d.fear += 3; d.chaos += 1; return [d, 4];
  }
  if (kind === "healthy") {
    d.growth += 5; return [d, 0];
  }
  d[key] = Math.min((d[key]||0)+1, 10); d.fear += 1; d.growth += 3; d.chaos += 1; return [d, 2];
}

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
}

const cards = [];
let idx = 1;

for (const row of base_cards) {
  const [title, cat, scenario, chaos, avoid, healthy, middle, roast] = row;
  for (const [suffix, age, add] of variants) {
    if (cards.length >= 250) break;
    const full_title = suffix ? `${title}: ${suffix}` : title;
    let opts = [["chaos", chaos], ["avoid", avoid], ["healthy", healthy], ["middle", middle]];
    opts = shuffle(opts);
    const options = [];
    const labels = ["A","B","C","D"];
    for (let i = 0; i < 4; i++) {
      const label = labels[i];
      const [kind, text] = opts[i];
      let [sc, mis] = makeScores(cat, kind);
      if (suffix === "After Midnight" && kind === "chaos") {
        sc.temptation = Math.min((sc.temptation||0)+1, 10);
        mis = Math.min(10, mis + 1);
      }
      options.push({
        label, text, scores: sc, mischief: mis,
        breakdown: pick(breakdowns[kind]),
        roast,
        reflection: pick(reflections[kind]),
        verdict: pick(verdicts[kind])
      });
    }
    cards.push({
      id: `${slug(full_title)}-${String(idx).padStart(3,"0")}`,
      category: cat,
      ageRating: age,
      title: full_title,
      scenario: scenario + add,
      options
    });
    idx++;
  }
}

const js = `// Full Mischievia card pack — ${cards.length} cards\n\nconst mischieviaCards = ${JSON.stringify(cards, null, 2)};\n\n// Apply default ageRating to any card missing it\nmischieviaCards.forEach(function(card) { if (!card.ageRating) card.ageRating = 'teen'; });\n`;

fs.writeFileSync("c:/Users/alexs/Downloads/mischievia-vsc-project/mischievia-vsc-project/cards.js", js, "utf-8");
console.log("Written cards.js");
console.log("Cards: " + cards.length);
