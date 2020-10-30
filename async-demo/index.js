console.log('Before');

// getUser(1).then(user => getRepos(user.name))
//     .then(repos => getCommits(repos[0]))
//     .then(commits => console.log(commits))
//     .catch(err => console.log(err.message));

async function displayCommits() {
    try {
        const user = await getUser(1);
        const repo = await getRepos(user.name);
        const commit = await getCommits(repo[0]);
        console.log(commit);
    } catch (err) {
        console.log(err.message);
    }

}
displayCommits();
console.log('After');

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('DB');
            resolve({ id: id, name: 'tonni' });
        }, 2000);
    });
}

function getRepos(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Repo');
            resolve(['r1', 'r2', 'r3']);
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Commits');
            // resolve(['commit']);
            reject(new Error('failed'))
        }, 2000);
    });
}