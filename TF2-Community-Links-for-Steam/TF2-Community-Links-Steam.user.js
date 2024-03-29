// ==UserScript==
// @name         TF2 Community Links for Steam 
// @namespace    https://github.com/l-Aad-l
// @version      0.1.9
// @author       Aad
// @description  Displays TF2 community related links on Steam
// @icon         https://store.steampowered.com/favicon.ico
// @license      GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// @include      /^https?:\/\/steamcommunity\.com\/(?:id|profiles)\/[\w-_]+\/?$/
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @run-at       document-end
// @homepageURL  https://github.com/l-Aad-l/userscripts
// @supportURL   https://github.com/l-Aad-l/userscripts/issues
// @downloadURL  https://raw.githubusercontent.com/l-Aad-l/userscripts/master/TF2-Community-Links-for-Steam/TF2-Community-Links-Steam.user.js
// @updateURL    https://raw.githubusercontent.com/l-Aad-l/userscripts/master/TF2-Community-Links-for-Steam/TF2-Community-Links-Steam.user.js
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
// @require      https://raw.githubusercontent.com/l-Aad-l/steam-profile-detailed-status/master/modules.min.js
// @require      https://raw.github.com/odyniec/MonkeyConfig/master/monkeyconfig.js
// ==/UserScript==

(function () {
    var actionsHeader = $("div.profile_header_actions");
    if (actionsHeader.length == 0) {
        return;
    }

    // Config to choose which sites you would like to see or not see
    var cfg = new MonkeyConfig({
        title: 'TF2CLS Options',
        menuCommand: true,
        onSave: function (values) {
            location.reload();
        },
        params: {
            "rgl": {
                label: 'RGL.gg',
                type: 'select',
                choices: ['Highlander', 'NA Prolander', 'Trad Sixes', 'Disable'],
                default: 'Highlander'
            },
            "steamrep": {
                label: 'SteamRep',
                type: 'checkbox',
                default: true
            },
            "steamdbcalc": {
                label: 'SteamDB',
                type: 'checkbox',
                default: true
            },
            "reptf": {
                label: 'Rep.TF',
                type: 'checkbox',
                default: true
            },
            "steamid": {
                label: 'SteamID',
                type: 'checkbox',
                default: true
            },
            "vacbanned": {
                label: 'VACBanned',
                type: 'checkbox',
                default: true
            },
            "backpacktf": {
                label: 'Backpack.tf',
                type: 'checkbox',
                default: true
            },
            "ugc": {
                label: 'UGC',
                type: 'checkbox',
                default: true
            },
            "esea": {
                label: 'ESEA',
                type: 'checkbox',
                default: true
            },
            "etf2l": {
                label: 'ETF2L',
                type: 'checkbox',
                default: true
            },
            "ozf": {
                label: 'ozfortress',
                type: 'checkbox',
                default: true
            },
            "rsp": {
                label: 'Respawn League',
                type: 'checkbox',
                default: true
            },
            "fbtf": {
                label: 'FBTF',
                type: 'checkbox',
                default: true
            },
            "faceit": {
                label: 'FACEIT',
                type: 'checkbox',
                default: true
            },
            "tf2center": {
                label: 'TF2Center',
                type: 'checkbox',
                default: true
            },
            "petroltf": {
                label: 'Petrol.tf',
                type: 'checkbox',
                default: true
            },
            "CustomLanderTF2": {
                label: 'CustomLanderTF2',
                type: 'checkbox',
                default: true
            },
            "logstf": {
                label: 'Logs.tf',
                type: 'checkbox',
                default: true
            },
            "trendstf": {
                label: 'Trends.tf',
                type: 'checkbox',
                default: true
            },
            "demostf": {
                label: 'Demos.tf',
                type: 'checkbox',
                default: true
            },
        }
    });

    // Get STEAM64 from user's page
    var sid = new Modules.SteamID(unsafeWindow.g_rgProfileData.steamid);

    // corrects STEAM IDs to proper STEAM64 
    sid.universe = Modules.SteamID.Universe.PUBLIC;
    sid.type = Modules.SteamID.Type.INDIVIDUAL;
    sid.instance = Modules.SteamID.Instance.DESKTOP;

    // STEAM64 
    var steamID = sid.getSteamID64();

    // STEAM3 for ESEA 
    var steamID3 = sid.getSteam3RenderedID();

    // STEAM2 for Sourcebans
    var steamID2 = sid.getSteam2RenderedID();

    //populate links
    var links = {
        "steamrep": {
            "link": `//steamrep.com/profiles/${ steamID }`,
            "name": "SteamRep",
            "status": true,
        },
        "steamdbcalc": {
            "link": `//steamdb.info/calculator/?player=${ steamID }`,
            "name": "SteamDB",
            "status": true,
        },
        "reptf": {
            "link": `//rep.tf/${ steamID }`,
            "name": "Rep.TF",
            "status": true,
        },
        "steamid": {
            "link": `//steamid.uk/profile/${ steamID }`,
            "name": "SteamID",
            "status": true,
        },
        "vacbanned": {
            "link": `http://vacbanned.com/view/detail/id/${ steamID }`,
            "name": "VACBanned",
            "status": true,
        },
        "backpacktf": {
            "link": `//backpack.tf/profiles/${ steamID }`,
            "name": "Backpack.tf",
            "status": true,
        },
        "rgl": {
            "link": `//rgl.gg/Public/PlayerProfile.aspx?p=${ steamID }`,
            "name": "RGL.gg",
            "status": true,
        },
        "ugc": {
            "link": `//www.ugcleague.com/players_page.cfm?player_id=${ steamID }`,
            "name": "UGC",
            "status": true,
        },
        "esea": {
            "link": `//play.esea.net/index.php?s=search&query=${ steamID3 }`,
            "name": "ESEA",
            "status": true,
        },
        "etf2l": {
            "link": `//etf2l.org/search/${ steamID }`,
            "name": "ETF2L",
            "status": true,
        },
        "ozf": {
            "link": `//ozfortress.com/users/steam_id/${ steamID }`,
            "name": "ozfortress",
            "status": true,
        },
        "fbtf": {
            "link": `//fbtf.tf/users?q=${ steamID }`,
            "name": "FBTF",
            "status": true,
        },
        "faceit": {
            "link": `//www.faceit.com/en/search/overview/${ steamID }`,
            "name": "FACEIT",
            "status": true,
        },
        "hlpugs": {
            "link": `//na.hlpugs.tf/player/${ steamID }`,
            "name": "HLPugs.tf",
            "status": true,
        },
        "tf2center": {
            "link": `//tf2center.com/profile/${ steamID }`,
            "name": "TF2Center",
            "status": true,
        },
        "petroltf": {
            "link": `//petrol.tf/sb/index.php?p=banlist&advSearch=${ steamID2 }&advType=steamid`,
            "name": "Petrol.tf",
            "status": true,
        },
        "CustomLanderTF2": {
            "link": `//www.cltf2.com/users/steam_id/${ steamID }`,
            "name": "CustomLanderTF2",
            "status": true,
        },
        "logstf": {
            "link": `//logs.tf/profile/${ steamID }`,
            "name": " Logs.tf",
            "status": true,
        },
        "trendstf": {
            "link": `//trends.tf/player/${ steamID }`,
            "name": "Trends.tf",
            "status": true,
        },
        "demostf": {
            "link": `//demos.tf/profiles/${ steamID }`,
            "name": "Demos.tf",
            "status": true,
        },
    };

    $.each(links, function (site, info) {
        if (cfg.get(site) == false || cfg.get(site) == "Disable") {
            info.status = false;
        }

        //if choice is the one selected, change site address
        if (cfg.get(site) == "NA Prolander") {
            info.link = `http://rgl.gg/Public/PlayerProfile.aspx?p=${ steamID }&r=1`;
        } else if (cfg.get(site) == "Highlander") {
            info.link = `http://rgl.gg/Public/PlayerProfile.aspx?p=${ steamID }&r=24`;
        } else if (cfg.get(site) == "Trad Sixes") {
            info.link = `http://rgl.gg/Public/PlayerProfile.aspx?p=${ steamID }&r=40`;
        }
    });

    // Build the links HTML
    var htmlstr = "";
    $.each(links, function (site, info) {
        if (info.status == true) {
            htmlstr +=
                `<div style="clear: both;"></div>
               <div class="profile_count_link ellipsis">
                  <a href="${ info.link }" target="_blank">
                    <span class="count_link_label">${ info.name }</span>
                    <span class="profile_count_link_total">&nbsp;</span>
                  </a>
               </div>`;
        }
    });

    // Insert the links HMTL into the page
    if (htmlstr) {
        if ($(".profile_item_links").length) {
            $(".profile_item_links").append(htmlstr + '<div style="clear: both;"></div>');
            var res_content = $("responsive_count_link_area");
            if(res_content) {
                $('.responsive_count_link_area').prepend("<p>Steam64 " + steamID + "</p>");
            } else {
                $('.profile_item_links').prepend("<p>Steam64 " + steamID + "</p>");
            }
        } else {
            $('.profile_rightcol').prepend("<p>Steam64 " + steamID + "</p>");
            $(".profile_rightcol").append('<div class="profile_item_links">' + htmlstr + '</div>');
            $(".profile_rightcol").after('<div style="clear: both;"></div>');
        }
    }


    GM_addStyle(`
        .profile_in_game {
          margin-bottom: 0px !important;
        }

        .profile_badges {
          margin-bottom: 0px !important;
        }
    `);
})();
