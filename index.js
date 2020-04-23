const Telegraf = require('telegraf') 
require('dotenv').config()
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const fs = require('fs')
const token = process.env.BOT_TOKEN


const bot = new Telegraf(token)
 
bot.use(Telegraf.log())

 bot.hears('markdown', ctx => ctx.reply(
 `*bold text*
 _italic text_
 [inline URL](http://www.example.com/)
 [inline mention of a user](tg://user?id=284186497)
 \`inline fixed-width code\`
\`\`\`
 pre-formatted fixed-width code block
 \`\`\`
`, Extra.markdown()))

bot.command('html', ctx => ctx.reply(
`<b>bold</b>, <strong>bold</strong>
<i>italic</i>, <em>italic</em>
<a href="https://loremflickr.com/g/320/240/paris/">Image URL</a>
<a href="tg://user?id=284186497">inline mention of a user</a>
<code>inline fixed-width code</code>
<pre>pre-formatted fixed-width code block</pre>`, Extra.HTML().webPreview(false)

))


// Markup

bot.command('custom', ctx => ctx.reply('Keyboard', Markup.keyboard(
  [['🐶Dog', '🐱Cat'], //ROW1
  ['🐻Bear', '🐵Monkey','🐦Bird']] //ROW2
 )
.resize()
.extra()
 )
)

bot.hears('🐶Dog',ctx => ctx.reply(`<a href="${random('dog')}">DOG</a>`,
Extra.HTML()))

bot.hears('🐱Cat',ctx => ctx.reply(`<a href="${random('dog')}">CAT</a>`,
Extra.HTML()))

bot.hears('🐻Bear',ctx => ctx.reply(`<a href="${random('dog')}">BEAR</a>`,
Extra.HTML()))

bot.hears('🐵Monkey',ctx => ctx.reply(`<a href="${random('dog')}">MONKEY</a>`,
Extra.HTML()))

bot.hears('🐦Bird',ctx => ctx.reply(`<a href="${random('dog')}">BIRD</a>`,
Extra.HTML()))



const random = tag => {
  let imgId = Math.trunc(Math.random()*1000)
  let url = `https://loremflickr.com/320/240/${tag}/?lock=${imgId}`
  return url 
}

// Inline Keyboard

bot.command('inline', ctx => ctx.reply(`Random image <a href="${random('dog')}">DOG</a>`,
  Extra.HTML().markup( 
    m => inline(m)
    ) 
  )
)

bot.action('dog', ctx => ctx.editMessageText(`Random image <a href="${random('dog')}">DOG</a>`,
  Extra.HTML().markup( 
    m => inline(m)
    )
  )
)  

bot.action('cat', ctx => ctx.editMessageText(`Random image <a href="${random('cat')}">CAT</a>`,
  Extra.HTML().markup( 
    m => inline(m)
   
    )
  )
)  

bot.action('bear', ctx => ctx.editMessageText(`Random image <a href="${random('bear')}">bear</a>`,
  Extra.HTML().markup( 
    m => inline(m)

    )
  )
)  

bot.action('monkey', ctx => ctx.editMessageText(`Random image <a href="${random('monkey')}">monkey</a>`,
  Extra.HTML().markup( 
    m => inline(m)
   
    )
  )
)  





const inline = (m) => m.inlineKeyboard(
  [ 
    [m.callbackButton('Next 🐶Dog','dog'),m.callbackButton('Next 🐱Cat','cat')],
   [ m.callbackButton('Next 🐻Bear','bear'),m.callbackButton('Next 🐵Monkey','monkey')]
  ] 

)






bot.action('cat', ctx => ctx.editMessageText(`Random image <a href="${random('cat')}">CAT</a>`,
Extra.HTML().markup( (m) => m.inlineKeyboard( [m.callbackButton('Next image','dog' ) ]))
))






bot.hears('document', ctx => ctx.replyWithDocument(
   { url: 'https://drive.google.com/file/d/1K1U8I8CuAYV70RGqZ6754eAwcE68bGDG/preview',
     filename: 'sample.pdf'
   }
 ))


 bot.hears('eagle', ctx => ctx.replyWithPhoto(
    { source: fs.createReadStream( 'tmp/eagle.jpg'),
      filename: 'eagle.jpg'
    }
  ))

  bot.hears('bird', ctx => ctx.replyWithPhoto(
    { url:  'https://www.hakaimagazine.com/wp-content/uploads/header-gulf-birds-1200x576.jpg',
      filename: 'bird.jpg'
    }
  ))

  bot.hears('video', ctx => ctx.replyWithVideo(
    { source: fs.createReadStream( 'tmp/video.mp4'),
      filename: 'video.mp4'
    }
  ))






bot.start(ctx => ctx.reply(`Welcome ${ctx.from.first_name}`))

bot.help(ctx => ctx.reply('Help page for @op8probot'))

bot.command(['command1' ,'command2'], ctx => ctx.reply('Command Ok 👍 '))




let re = /^[0-9]*$/


bot.hears(re, ctx =>{

  ctx.reply(`You are ${ parseInt (ctx.message.text)  >= 18 ? 'adult' :  'underage'}`)
})

bot.hears('Hello World', ctx => ctx.reply('Hey there'))
    


bot.on('photo', ctx => {
    ctx.reply('Nice photo!')
})

bot.on('sticker', ctx => {
    ctx.reply('Nice sticker!')
 
})

bot.on(['sticker', 'video'] ,ctx => {
    ctx.reply('I like it!') 

   






        
})
bot.launch()


//https://api.telegram.org/bot1222153504:AAEE0YVEdx99XJ-YHtcVy5DJcQEoyiXzuEs/getUpdates