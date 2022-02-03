# byu-disk-golf

There is an unofficial disc golf course on BYU campus. Because it is unofficial, there are no markers indicating where each hole starts or ends, or the par for each hole. `BYU Disk Golf` solves these issues showing users where they need to be, where they need to go, and everything else they need to know to have a great time playing disk golf.
<br>
<br>
## Initial Setup
NodeJS must be installed in order to begin development. If you need assistance installing Node then please refer to [this video](https://www.youtube.com/watch?v=qh1E_U_Ywfw) or reach out to Connor Bunch.

To test your Node installation, please enter the following commands:

```bash
node --version
```
This should output the current Node version, i.e. v16.13.2
```bash
npm --version
```
This should output the current NPM version, i.e. 8.1.2
```bash
sudo node --version
```
This is to make sure node is reachable by sudo. If sudo doesn't know where Node is, then you will run into trouble.
```bash
sudo npm --version
```
Again, we are making sure sudo knows where npm is.
<br>
<br>
Lastly, make sure the following common programs are installed on your machine. Node projects frequently call on these programs for building, testing, and running.
```
make
python3
python (or perhaps python-is-python3)
gcc
g++
```
Hint: On an apt based linux distribution (Ubuntu, Linux Mint, Pop!_OS, etc.), you can install a package by running `sudo apt install <package name>`.
For example, to install `make`, run `sudo apt install make`. If you're on Windows, MacOS, or a non-apt based linux distribution, your platform will
most likely have a package manager that works in a similar fashion.
<br>
<br>
## Getting Started

### 1. Clone the code repository.

For ssh
```bash
git clone git@github.com:seveerekaj/byu-disc-golf.git
```
For https
```bash
git clone https://github.com/seveerekaj/byu-disc-golf.git
```

For guidance on cloning code repositories with Git, please refer to this [guide](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository).

### 2. `cd` into the repository

```bash
cd byu-disk-golf
```

### 3. Install the required Node modules.

```bash
npm install
```
If you encounter any isues running `npm install`, try prefacing the command with `sudo`, i.e. `sudo npm install`

### 4. Start the local development web server.

```bash
npm run dev
```
If you encounter any isues running `npm run dev`, try prefacing the command with `sudo`, i.e. `sudo npm run dev`
<br>
<br>
Other scripts for the BYU disk golf project (i.e. for running in a production environment or for testing) can be found in the `package.json` file in the root directory of the project.
<br>
These scripts are also summoned via the `npm run` command, followed by the script name

### 5. Connect to the web server

In your web browser, visit the url [localhost:4200](localhost:4200)
<br>
<br>
You should now see the BYU-disk-golf UI.
<br>

## File structure

Our project is split into two parts.  The frontend code is inside the [client](./client) folder while the server is inside the [server](./server) folder.

Running `npm run dev` will start both pieces for you at the same time allowing for concurrent development of both parts.

If for some reason you want to start only one part by itself then there are two options

1. From the root of the project run `npm run <project>:dev`, i.e. `npm run client:dev`
2. Navigate to the project you want to start and run `npm run dev` 