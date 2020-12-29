import discord
import json
from auth import token

checkUsageMsg = "Usage: `check SKU_NUMBER1 SKU_NUMBER2 ... SKU_NUMBERN`"


def checkforChanges(product):
    #make it check for changes and report
    return False

def generateEmbed(product):
    embed=discord.Embed(title=product['name'], url=product['url'], description="description goes here", color=0xff0000)
    embed.set_thumbnail(url=product['image'])
    embed.add_field(name="Price:", value=product['price'], inline=True)
    embed.add_field(name="SKU:", value=product['sku'], inline=True)
    embed.add_field(name="Quantity:", value=product['count'], inline=True)
    embed.add_field(name="Part #:", value=product['modelnum'], inline=True)
    embed.add_field(name="UPC:", value=product['upc'], inline=True)
    embed.set_footer(text="Last updated: date goes here")
    return embed



with open('products.json') as file:
    products_db = json.load(file)

client = discord.Client()

@client.event
async def on_ready():
    print('We have logged in as {0.user}'.format(client))

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if message.content.startswith('!'):
        try:
            if message.content[1:].isnumeric() and len(message.content) == 7:
                product = products_db[message.content[1:]]
                embed = generateEmbed(product)
                await message.channel.send(embed=embed)
        except KeyError:
            await message.channel.send("I don't have that SKU.")

    if message.content.startswith('check'):
        # check 688937
        msgSplit = message.content.split()
        if len(msgSplit) == 1:
            await message.channel.send(checkUsageMsg)
            return
        for word in msgSplit[1:]:
            if len(word) == 6 and word.isnumeric():
                await message.channel.send("I'm supposed to update SKU `{}`".format(word))
            else:
                product = products_db[word]
                #checkForChanges(product)
                await message.channel.send(checkUsageMsg)



           

client.run(token)