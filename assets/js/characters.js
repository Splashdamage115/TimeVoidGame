const CHARACTER = {
    None: 'None',
    Archer: 'Archer',
    Sword: 'Sword',
    Shield: 'Shield'
};

function CharacterType(Sprite, health, charType, owner)
{
    this.Sprite = Sprite;
    this.maxHealth = health;
    this.health = 2;
    this.damage = 1;
    this.characterType = charType;
    this.owner = owner;

    this.takeDamage = function(damageAmt)
    {
        this.health -= damageAmt;
        //console.log(this.health);

        // return a bool true if the character is dead
        if(this.health <= 0)
            return true;
        return false;
    };

    this.resetHealth = function()
    {
        this.health = this.maxHealth;
    };

    this.render = function()
    {
        this.Sprite.render();
    }
}