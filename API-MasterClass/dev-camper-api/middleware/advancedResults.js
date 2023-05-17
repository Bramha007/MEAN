module.exports.advancedResults =
    (model, populate) => async (req, res, next) => {
        let query;
        let reqQuery = { ...req.query }; //Copy req.query

        const removeFields = ["select", "sort", "limit", "page"];

        //loop over and delete fields that are in 'removeFields'
        removeFields.forEach((param) => delete reqQuery[param]);

        let queryStr = JSON.stringify(reqQuery); //Create query string

        //Create operators like $gte, etc
        queryStr = queryStr.replace(
            /\b{gt|gte|lt|lte|in}\b/g,
            (match) => `$${match}`
        );

        query = model.find(JSON.parse(queryStr));

        if (populate) query = query.populate(populate);
        //Finding resourse

        // Select Fields is present
        if (req.query.select) {
            const fields = req.query.select.split(",").join(" ");
            query = query.select(fields);
        }

        // Sort by the requested field
        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort("-createdAt");
        }

        //Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 25;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await model.countDocuments();

        query = query.skip(startIndex).limit(limit);

        //Executing the query
        const results = await query;

        //Pagination result
        const pagination = {};
        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit,
            };
        }
        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit,
            };
        }
        res.advResults = {
            sucess: true,
            count: results.length,
            pagination,
            data: results,
        };
        next();
    };
