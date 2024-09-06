const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
let db = new Map();
let dbIndex = 1;

app.get('/', (req, res) => {
    res.send('Chan Board');
});

app.post('/upload', (req, res) => {
    //게시글 업로드
    const postTitle = req.body.title;
    if (postTitle) {
        db.set(dbIndex++, req.body);

        res.status(201).json({
            result: true,
            uploadData: req.body,
        });
    } else {
        res.status(400).json({
            result: false,
            message: '올바르지 않은 요청입니다.',
        });
    }
});

app.get('/post/:id', (req, res) => {
    //게시글 조회
    const postId = parseInt(req.params.id);
    if (postId) {
        const postData = db.get(postId);
        if (!postData) {
            res.status(404).json({
                result: false,
                message: '게시글이 존재하지 않습니다.',
            });
        } else {
            res.json({
                result: true,
                postData: postData,
            });
        }
    } else {
        res.status(400).json({
            result: false,
            message: '올바르지 않은 게시글입니다.',
        });
    }
});

app.get('/posts', (req, res) => {
    //전체 게시글 조회
    let posts = {};

    if (db.size > 0) {
        db.forEach((value, key) => {
            posts[key] = value;
        });

        res.json(posts);
    } else {
        res.status(404).json({
            result: false,
            message: '게시글이 존재하지 않습니다.',
        });
    }
});

app.delete('/post/:id', (req, res) => {
    //게시글 삭제
    const postId = parseInt(req.params.id);
    if (postId) {
        db.delete(postId);

        res.json({
            result: true,
            postId: postId,
        });
    } else {
        res.status(400).json({
            result: false,
            message: '올바르지 않은 게시글입니다.',
        });
    }
});

app.delete('/posts', (req, res) => {
    //전체 게시글 삭제
    if (db.size > 0) {
        db.clear();

        res.json({
            result: true,
            message: '전체 게시글을 삭제하였습니다.',
        });
    } else {
        res.status(404).json({
            result: false,
            message: '게시글이 존재하지 않습니다.',
        });
    }
});

app.put('/post/:id', (req, res) => {
    //게시글 수정
    const postId = parseInt(req.params.id);
    if (postId) {
        const post = db.get(postId);
        const oldTitle = post.title;
        if (!post) {
            res.status(404).json({
                result: false,
                message: '게시글이 존재하지 않습니다.',
            });
        } else {
            const newTtitle = req.body.title;

            post.title = newTtitle;
            db.set(postId, post);

            res.json({
                result: true,
                message: `${oldTitle}게시글 제목이, ${newTtitle}로 변경되었습니다.`,
            });
        }
        res.status(400).json({
            result: false,
            message: '올바르지 않은 게시글입니다.',
        });
    } else {
        res.status(400).json({
            result: false,
            message: '올바르지 않은 게시글입니다.',
        });
    }
});

app.listen(port, () => {
    console.log(`ChanBoard app listening on port ${port}`);
});
