/**
 * Webcrypto implementaition
 *
 * Copyright 2016-2019 Daniil Gentili
 * (https://daniil.it)
 * This file is part of MadelineNode.
 * MadelineNode is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * MadelineNode is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU General Public License along with MadelineNode.
 * If not, see <http://www.gnu.org/licenses/>.
 *
 * @author    Daniil Gentili <daniil@daniil.it>
 * @copyright 2016-2019 Daniil Gentili <daniil@daniil.it>
 * @license   https://opensource.org/licenses/AGPL-3.0 AGPLv3
 */

import { incCounter } from "../crypto-sync/crypto"

/**
 * Implementation of native AES CTR continuous buffering
 */
class Ctr {
    name = "AES-CTR"
    by = 0
    /**
     * 
     * @param {Uint32Array} iv 
     * @param {BufferSource} key 
     */
    constructor(iv, key) {
        this.counter = iv
        this.length = 16
        this.key = key
    }
    /**
     * Encrypt data
     * @param {BufferSource} data Data to encrypt
     */
    process(data) {
        this.incCounter(this.by)
        this.by = (data.BYTES_PER_ELEMENT * data.length) / 16
        return window.crypto.subtle.encrypt(this, this.key, data)
    }
}
Ctr.prototype.incCounter = incCounter

class CryptoWebCrypto {
    sha1(data) {
        return window.crypto.subtle.digest('SHA-1', data)
    }
    sha256(data) {
        return window.crypto.subtle.digest('SHA-256', data)
    }
    getCtr(iv, key) {
        return new Ctr(iv, key)
    }
    factorize(what) {
        return this.asyncTask({
            task: 'factorize',
            what
        })
    }
    secureRandom(buffer) {
        return this.asyncTask({
            task: 'secureRandom',
            buffer
        })
    }
    secureRandomInt(mod) {
        return this.asyncTask({
            task: 'secureRandom',
            mod
        })
    }
}

export default CryptoWebCrypto