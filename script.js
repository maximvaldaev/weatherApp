const link = "http://api.weatherstack.com/current?access_key=2df92f4a61a1943b7f0d53947ee7cef4";

const root = document.getElementById('root');
const popup = document.getElementById('popup');
const textInput = document.getElementById('text-input');
const form = document.getElementById('form');
const closeForm = document.getElementById('close');

let store = {
    city: "moscow",
    feelslike: 0,    
    temperature: 0,    
    observationTime: "00:00 AM",    
    isDay: "yes",
    description: "",    
    properties: {
      cloudcover: {},
      humidity: {},
      windSpeed: {}, 
      pressure: {},
      uvIndex: {},
      visibility: {},
    }
}

const fetchData = async () => {
  const query = localStorage.getItem('query') || store.city;
    const result = await fetch(`${link}&query=${query}`);
    const data = await result.json();
    
    const { 
        current: {
            feelslike, 
            cloudcover, 
            temperature,
            humidity,
            observation_time:observationTime,
            pressure,
            uv_index:uvIndex,
            visibility,
            is_day:isDay,
            weather_descriptions:descriptions,
            wind_speed:windSpeed
        },

        location: {
          name
        }
    } = data;
    console.log(data);
    store = {
        ...store,
        city: name,
        feelslike,        
        temperature,        
        observationTime,        
        isDay,
        description:descriptions[0],         
        properties: {
          cloudcover: {
            title: "cloudcover",
            value: `${cloudcover}%`,
            icon: 'https://s426vla.storage.yandex.net/rdisk/0cdbd1f66f07a780b2001ca84f1ac725ceda326bce7f9a06256c10500d33efb8/6338992d/xeR-2xJkxCoKMrkfCETxr1RyL9eV2-bF2fU3vKncQ_TdRpwnThdXmK82dr4Bvgu4fqXPwaPQGp_e8dRZgw9cow==?uid=275155156&filename=clear.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=275155156&fsize=9454&hid=9e1abd02d0155f7301f87d45043fcc66&media_type=image&tknv=v2&etag=daea70eb3eca097d36a5ece6f14f6828&rtoken=fOUqaCEOzBvp&force_default=yes&ycrid=na-dd017986ec68e9bf653dcfbf19cbbf3d-downloader6f&ts=5e9fe5f46e540&s=3b312676a229b48c32a1268281bdbc8f787500a7c86aa165433dc283925e5147&pb=U2FsdGVkX1_hvOFojz_0s3scLDbcyGcNs_H-7QqUGYraRJseRjNuI-T6neC6AKBwCR4ELzFCTWfi9WoSLiT_-VzlvebE-6bOl7D2YI9yY2k'
          },
          humidity: {
            title: "humidity",
            value:`${humidity}%`,
            icon: 'https://s355vla.storage.yandex.net/rdisk/24c18efc1a3460504d7cf19743cade34456a4c54d0090dbd34b1f13bf14f3533/633899ab/xeR-2xJkxCoKMrkfCETxrxvdL-VhE0_C6iC0tVNXmqx9cfvAYxO_jWwjP14CLUZrkQmLVrjUSeA08KNWCcBaaw==?uid=275155156&filename=humidity.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=275155156&fsize=20130&hid=4de4605cc7275b9070bd8764e0f5c81e&media_type=image&tknv=v2&etag=d934c304fcf62fd1866c6e637b348a92&rtoken=HZxUOw4gNoP5&force_default=yes&ycrid=na-3269fed0ba2977b5f353ccaed0eb4d74-downloader6f&ts=5e9fe66c980c0&s=29c265aefa42a55e3aa984113626a4314ba4e1b5f43a580ae35c9f5b5c238679&pb=U2FsdGVkX1_Q8a91uO6v0wKrOsAYti91Heg02WtnIuE3tD8djE_aYBqhcngeOzuLLnLQYbnEGg-GJ1EZJ4CbFO7uWxQ2nYua3CArmelVF9k'
          },
          windSpeed: {
            title: "wind Speed",
            value: `${windSpeed}m/s`,
            icon: 'https://s416vla.storage.yandex.net/rdisk/9e011b28272cd931f5dab68c29c34b9390732d573b4a4c5798c7c8f7f6d289b2/633899d0/cwltNWTObtuKsN6v4-_fQ3rpv8ZNdO8QTTg-YpcK6upseawGCDH0NU_irXlmnBzsamZ1qjI7oODYYjX6ObNK_w==?uid=275155156&filename=wind.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=275155156&fsize=11676&hid=fdd569fad3212299fc4024eef65e4c3f&media_type=image&tknv=v2&etag=6975f668632a22ab80c450bdf5f896fd&rtoken=3eKHW5XXebVV&force_default=yes&ycrid=na-3bece76aebf214221e9b2c8483d000ac-downloader6f&ts=5e9fe68fe1400&s=c791405f774b717139362fa93bc525761ab395058e13f2e986126e44fa802dbf&pb=U2FsdGVkX185Ls6tzjWSHMki3z_y_uHPJkKVlIc7tFuxl4OJZ5OdiorEFPnPKgi2SSGQQw10i931sXSW6UITAQ0OvpLa1YI6FfqFmKNci9Q'
          }, 
          pressure: {
            title: "pressure",
            value: `${pressure/100}%`,
            icon: 'https://s406vla.storage.yandex.net/rdisk/8dbe3dc40c2ac376017ac343474acaae8af4c591552d724a32c6b9bc6a6d480f/633899e2/xeR-2xJkxCoKMrkfCETxrykpDy2uM9cPymuXBFR-dSPgWK252pzjkFA3wwQY4vF98weM_6SyrcJrPalWtsEARA==?uid=275155156&filename=gauge.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=275155156&fsize=24020&hid=209ce9f54f23404ab49c32a891eabfba&media_type=image&tknv=v2&etag=8dfc0f14c510f69054f4a1a1d2d83aea&rtoken=UbQYkIK0aVno&force_default=yes&ycrid=na-d75d6eca62b27f664ec5544b46a30ab9-downloader6f&ts=5e9fe6a10bc80&s=4d9e39e88618cbeaa8795e44775d02eb78813525dc1f6a2fbe168320f78d6736&pb=U2FsdGVkX18VzT_LAhVFxSSvKVhZo3kZOQ5qWXx6UPffU46Oo3MSXfrH1UpPwksdaAW_GVJzJfyO6w5ZwtYtD50qr1Mk4pBLmw2d3sK6kOM'
          },
          uvIndex: {
            title: "uvIndex",
            value: `${uvIndex}/100`,
            icon: 'https://s785sas.storage.yandex.net/rdisk/61209003d517c88b1a93856b8e9fa921424adac6607094ad5d421721c58da93a/633899f3/xeR-2xJkxCoKMrkfCETxr7MwIcsclHla0BQ7em_cYQ2m42uXh7maqQPKJlpoxECcTI9RE6PIF1xAT5CoqChnyQ==?uid=275155156&filename=uv-index.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=275155156&fsize=27677&hid=30eff746c04932934cb136bd020f98be&media_type=image&tknv=v2&etag=ec20a789b3281765e7325994f4522795&rtoken=alxoPyS8rfxI&force_default=yes&ycrid=na-e9c74cc35aa20a61d66e43e4b5bf77d3-downloader6f&ts=5e9fe6b1422c0&s=9e0e802dea59472b24903102792b47d6d3838e275b4dc66a68c9b3819415f730&pb=U2FsdGVkX18rOnRbDNembeojDQQQFQm7-Mo5cwSE6zJXlS0lThCVUG4DLnzH6ss_NaxbjmqH7Y_J6qlzaNGZP_LTYMdDu94162HuIfUjYwU'
          },
          visibility: {
            title: "visibility",
            value: `${visibility}%`,
            icon: 'https://s804sas.storage.yandex.net/rdisk/a997f6272accc108c9b9a68610098847c779f86dcf01d605fe2f64bf2e419a65/63389a0d/xeR-2xJkxCoKMrkfCETxrx_YDGjyr0fJFVERgHYT4rVazxRUcLdQbdhq44enJC3pUmbCSrAWzyDMQzBCrmi2Eg==?uid=275155156&filename=visibility.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=275155156&fsize=18688&hid=e5f51a67b12c87405d38ffb2a02b0d21&media_type=image&tknv=v2&etag=6a5bd1716cde090d6463c2e5d1a8e67a&rtoken=FYk3QsZxc1GJ&force_default=yes&ycrid=na-b8f2c5772975d42cdbb12be352a09ef0-downloader6f&ts=5e9fe6ca0dd40&s=377701deb889157b9ffbc7f3df81ceda81d177373763993ca77eea3313fd7e5e&pb=U2FsdGVkX1-nJHoEIh1dQzzPQPPQH-r24dPJgcscuMjMujf6whlq2_Hg9AqrfzZgwZ9zND7hrd-WhXbE7_HheyKZfwhehd4oHukke_MkRFI'
          },
        }       
    }
    console.log(store);

    renderComponent();    
}

const getImage = (description) =>{ 
  
  const value = description.toLowerCase();
    
  switch(value) {
    case "partly cloudy":
      return 'https://s344vla.storage.yandex.net/rdisk/3aef05d748c84e65699586b5fcd200810cbb358f47e94ba9e4468c6a4ed230d8/63389a7a/xeR-2xJkxCoKMrkfCETxrx7D8tK-vdmxvwh4qwvs77mdtTevQyEYOZNAhhDaB97KinjIknU5VFhyQBHs7dDyFw==?uid=275155156&filename=partly.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=275155156&fsize=13858&hid=107f3236ef9cb2b367edbd789a5ca1e7&media_type=image&tknv=v2&etag=4ea4134f64f361f857a479ca406eda17&rtoken=hGJgKMt0WKlf&force_default=yes&ycrid=na-1c7af3284c5e18ef18bd696846db6e12-downloader6f&ts=5e9fe73201280&s=6fe495636f152b5781138b0e7cd16cba64adfedb3b9e401362afdb1ef029f331&pb=U2FsdGVkX18eISYRkMjTipOqbKfJJU5hC6uIrFqDS4_5RBe33uzdg0hkNYLXo3gat9j6wh6Bnr-g0ARWQYt7f-M7TN80Ze1Zp7VFAccv8GI';
    case "sunny":
      return 'https://s842sas.storage.yandex.net/rdisk/e478f667a4d189715f58943b1ef5e0b376f930e3db8c46de54d9b08c4671bdba/63389a89/xeR-2xJkxCoKMrkfCETxr_Htq4KbAN1bLfgo9Bo9_aCCDIG1gxhTl0hwjMYCYJRJqgJ3sqBDImSYY751tBqv6Q==?uid=275155156&filename=sunny.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=275155156&fsize=2373&hid=8463a32ed3117a2cac18027bae270e4b&media_type=image&tknv=v2&etag=c7bb7562ef0a6c6d72151e64c0db0df5&rtoken=U7J2SjBqDIdo&force_default=yes&ycrid=na-af9c534f6c2afe6457802a965901ce51-downloader6f&ts=5e9fe7404f440&s=7abcf58e32cfcf7b292c37e6d03f525ce90f1c294b674d48410431001d6a591e&pb=U2FsdGVkX1-kiOxd_nGRVZv4-gFZFgNZuj-Isk7oQ3TkvvSHPgBVXdAus6LymnCqP6f4v_L1UuZlZ6uYHgRsu_aEYFB_qpeEKA8WT3rHBSI';
    case "clear":
      return 'https://s426vla.storage.yandex.net/rdisk/a6233b49c2a71a067373c9e3d0453315874bd8e82cb8e50883b02311d42c6be6/63389aa6/xeR-2xJkxCoKMrkfCETxr1RyL9eV2-bF2fU3vKncQ_TdRpwnThdXmK82dr4Bvgu4fqXPwaPQGp_e8dRZgw9cow==?uid=275155156&filename=clear.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=275155156&fsize=9454&hid=9e1abd02d0155f7301f87d45043fcc66&media_type=image&tknv=v2&etag=daea70eb3eca097d36a5ece6f14f6828&rtoken=Hi4iznTgVTSs&force_default=yes&ycrid=na-dd4aa9fa0fdc2b5af28f840c64382378-downloader6f&ts=5e9fe75bf7580&s=92de39c8726215a3e8eeaea5473ebbea41be1b154a2d91c4468d9566738f06f5&pb=U2FsdGVkX19s8ZTslinbr7g9jXr0hh_8hDe6JrVDt0b163NwUk2PxqvFUXk1gWiYnsTFZz2B-U5GTKZBEa1Y93Gr4AoQ4mGindmgjXpY8pQ';
    case "cloud":
      return 'https://s291iva.storage.yandex.net/rdisk/314ab0e511e207e90a62e59f65899e3b6df018b2e587b21f3356c24866878418/63389ab0/xeR-2xJkxCoKMrkfCETxrwJOExk2KErp3zonaDRrkErSxyBA76wRa80ss6khyvkTCwgqaQWxPbQ6NQ0xiybQPw==?uid=275155156&filename=cloud.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=275155156&fsize=9050&hid=374d3a9c521f2a7fda2876363fcf8e37&media_type=image&tknv=v2&etag=91a98b473d256243554a8cddb38b1418&rtoken=KB4H6GgxRiDu&force_default=yes&ycrid=na-f36df9458f725e036cdccd74a96b3e29-downloader6f&ts=5e9fe76580c00&s=c8644fae9b4058a4165434685a03dbf88fcb35f2313840b1d838b9f57ec33896&pb=U2FsdGVkX1-v79j4tmahAb9pz7FCuE7QlI6H7aq3gRMtrUZo4xIzBMeTARqIjBwucHwKOa0TiYMyVI5szUgYgI4oABQRLDlYv4eZUSYQems';
    case "fog":
      return 'https://s772sas.storage.yandex.net/rdisk/6b956f14757b0b32aaf4899a942df44998ad344814ed69624f54677d07c9993a/63389ac2/KO2ueN0dPAWt0KL-1-y4xSfSYW2zO6fWa8gh-46KNpHBf4nRjFJ8_zSnXaC8JDGIQAMXzVbWO-U6yg3ceK5CDg==?uid=275155156&filename=fog.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=275155156&fsize=26289&hid=e180434b0ea0a80ce111ed7ff2946e5b&media_type=image&tknv=v2&etag=2118a0dd4d863e2cfa8329195744da30&rtoken=vyaoDetkR8y3&force_default=yes&ycrid=na-cff29b3ef9672f241d5d22c4f3c4d631-downloader6f&ts=5e9fe776ab480&s=70883de8c312bcd3de157a06736029231d36a9e850502717110cc322087de534&pb=U2FsdGVkX1-2n92Wqgbu1GXnCgPDPyP1GvXx97jR30Osf1TpYh-kD5zWRf8FTctSK5iP4iEeuhLp1Rao6NgHJ6af7wIm3pzVxp9mldxpiOY';
    default:
      return 'https://s01vlx.storage.yandex.net/rdisk/e601f1da75dd316caf62d8bd74e69116fb643d7fafd9afed4b0f2d05b5fbcec7/63389acc/xeR-2xJkxCoKMrkfCETxrz-CJeTmhT6vkakDdtS6kQ8bCway1PXVrYsbhh7Se_Uz48bKpZo1uxyI1jLfm4YlzA==?uid=275155156&filename=the.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=275155156&fsize=12901&hid=850f145f1ba59e0c1dff718c0b58d8ff&media_type=image&tknv=v2&etag=56f15b14162f2371a6aeb123170d4829&rtoken=ZhaAXrhxDAZ0&force_default=yes&ycrid=na-4fc39a75c517968d90378b1e17ad6d76-downloader6f&ts=5e9fe78034b00&s=b5d9f8f9340f26a491a6c970db203ad03ffa5a12c2cefbbad6bfaf4f9f0e4edf&pb=U2FsdGVkX19JX_vkiWPSdcovEjDEt-1otH06DHzIf0s1t6T2fc2xsnlp7NPLeW0MTdEPEmJAwD7LK_9V3n34hQVYUP9IX5tDj8cxFNYChs8';  
  }
}

const renderProperty = (properties) =>{     
  
  return Object.values(properties).map(({title, value, icon})=>{
    //console.log ('title', title);
    //console.log ('value', value);
    //console.log ('icon', icon);
    //const {title, value, icon}= sproperties;

    return `<div class="property">
    <div class="property-icon">
      <img src="${icon}" alt="">
    </div>
    <div class="property-info">
      <div class="property-info__value">${value}</div>
      <div class="property-info__description">${title}</div>
    </div>
  </div>`;
  }).join("");
}

const markup = () => {
  const {city,description,observationTime,temperature,isDay, properties}= store;

  const containerClass = isDay === "yes" ? "is-day": "";

    return `<div class="container ${containerClass}">
    <div class="top">
      <div class="city">
        <div class="city-subtitle">Weather Today in</div>
          <div class="city-title" id="city">
          <span>${city}</span>
        </div>
      </div>
      <div class="city-info">
        <div class="top-left">
        <img class="icon" src="${getImage(description)}" alt="" />
        
        <div class="description">${description}</div>
      </div>
    
      <div class="top-right">
        <div class="city-info__subtitle">as of ${observationTime}</div>
        <div class="city-info__title">${temperature}°</div>
      </div>
    </div>
  </div>
<div id="properties">${renderProperty(properties)}</div>
</div>`;
}

const togglePopupClass = () => {
  popup.classList.toggle('active');
}

const renderComponent = () => {
    root.innerHTML = markup();    
    const city = document.getElementById('city');
    city.addEventListener('click', togglePopupClass);
    

}

const handleInput = (e) => {
  store = {
    ...store,
    city: e.target.value,
  }
}

const handleSubmit = (e) => {
  e.preventDefault();
  const value = store.city;

  if (!value) return null;

  localStorage.setItem("query", value);
  fetchData();
  togglePopupClass();

}

form.addEventListener('submit', handleSubmit);
textInput.addEventListener ('input', handleInput);
closeForm.addEventListener ('click', togglePopupClass);

fetchData();
