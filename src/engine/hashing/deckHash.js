import { base64ToUnitKey, unitKeyToBase64 } from './unitHash';

//Returns hash built from deck array
export function hashEncode(deck) {
  /*
  var current_hash = [];
  var has_priorities = false;
  var has_indexes = false;
  var indexes = [];

  if (deck.commander) {
      current_hash.push(unitInfo_to_base64(deck.commander));
  }
  var copies = [1];
  var lastIndex = 0;
  for (var k in deck.deck) {
      var current_card = deck.deck[k];
      if (current_card.priority) {
          has_priorities = true;
      }
      if (current_card.index) {
          indexes.push(numberToBase64(current_card.index));
          has_indexes = true;
      }
      var triplet = unitInfo_to_base64(current_card);
      // Short-circuit encoding of multiples for now
      if (false && triplet == current_hash[lastIndex]) {
          copies[lastIndex]++;
      } else {
          current_hash.push(triplet);
          copies.push(1);
          lastIndex++;
      }
  }

  if (has_priorities) {
      var priorities = priorityDelimiter;
      for (var k in deck.deck) {
          var current_card = deck.deck[k];
          if (current_card.priority) {
              priorities += current_card.priority;
          } else {
              priorities += '0';
          }
      }
      current_hash.push(priorities);
  }

  if (has_indexes) {
      indexes = indexDelimiter + indexes.join('');
      current_hash.push(indexes);
  }

  for (var i = 0; i < copies.length; i++) {
      var num = copies[i];
      if (num > 1) {
          current_hash[i] += encode_multiplier(num);
      }
  }
  current_hash = current_hash.join("");

  return current_hash;
  */
}

export function hash_decode(hash) {
  /*
  var current_deck = { deck: [] };
  var unitInfo;
  var indexes;
  var entryLength = 5;
  if (hash.indexOf(indexDelimiter) > 0) {
      // Ignore indices for now
      indexes = hash.substr(hash.indexOf(indexDelimiter) + 1).match(/.{1,2}/g);
      hash = hash.substr(0, hash.indexOf(indexDelimiter));
  }
  var unitidx = 0;
  for (var i = 0; i < hash.length; i += entryLength) {
      if (multiplierChars.indexOf(hash[i]) == -1) {
          // Make sure we have valid characters
          var unitHash = hash.substr(i, entryLength);
          unitInfo = base64_to_unitInfo(unitHash);
          if (unitidx > 0 && indexes) unitInfo.index = base64ToNumber(indexes[unitidx - 1]); // Skip commander

          if (unitInfo) {
              if (loadCard(unitInfo.id)) {
                  // Repeat previous card multiple times
                  if (!current_deck.commander && is_commander(unitInfo.id)) {
                      current_deck.commander = unitInfo;
                      unitidx++;
                      // Add to deck
                  } else {
                      current_deck.deck.push(unitInfo);
                      unitidx++;
                  }
              } else {
                  console.log("Could not decode '" + unitHash + "' (" + unitInfo.id + ")");
              }
          }
      } else {
          var multiplier = decode_multiplier(hash.substr(i, 2)) + 1;
          for (var n = 0; n < multiplier; n++) {
              var duplicate = makeUnitInfo(unitInfo.id, unitInfo.level, unitInfo.runes);
              if (indexes) {
                  duplicate.index = base64ToNumber(indexes[unitidx - 1]); // Skip commander
              }
              current_deck.deck.push(duplicate);
              unitidx++;
          }
          i -= (entryLength - 2); // Offset i so that the += unitLength in the loop sets it to the correct next index
      }
  }

  // Default commander to Elaria Captain if none found
  if (!current_deck.commander) {
      current_deck.commander = elariaCaptain;
  }

  return current_deck;
  */
}
