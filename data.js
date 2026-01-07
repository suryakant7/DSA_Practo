// ============================================
// DSA QUEST - Problem Data (First 10 Patterns)
// ============================================

const dsaPatterns = [
    { id: 1, name: "Array Traversal & Simulation" },
    { id: 2, name: "Two Pointers" },
    { id: 3, name: "Sliding Window" },
    { id: 4, name: "Prefix Sum" },
    { id: 5, name: "Hashing / Frequency Map" },
    { id: 6, name: "Sorting + Greedy" },
    { id: 7, name: "Binary Search (Classic)" },
    { id: 8, name: "Binary Search on Answer" },
    { id: 9, name: "Stack (Monotonic Stack)" },
    { id: 10, name: "Queue / Deque" },
    { id: 11, name: "Linked List" },
    { id: 12, name: "Tree Traversal" },
    { id: 13, name: "Binary Search Tree (BST)" },
    { id: 14, name: "Heap / Priority Queue" },
    { id: 15, name: "Graph – BFS / DFS" },
    { id: 16, name: "Graph – Shortest Path" },
    { id: 17, name: "DP – 1D" },
    { id: 18, name: "DP – 2D" },
    { id: 19, name: "Backtracking" },
    { id: 20, name: "Bit Manipulation" }
];

const dsaProblems = [
    // ============================================
    // 1️⃣ Array Traversal & Simulation
    // ============================================
    {
        id: 1,
        patternId: 1,
        title: "Best Time to Buy and Sell Stock",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
        hint: "Track the minimum price seen so far",
        approach: "Single pass - track min price and max profit. For each price, update min if lower, else check if selling gives better profit.",
        complexity: "Time: O(n) | Space: O(1)",
        keyInsight: "You want to buy at the lowest point BEFORE a high point. Track running minimum.",
        pseudocode: `minPrice = infinity
maxProfit = 0
for price in prices:
    if price < minPrice:
        minPrice = price
    else:
        maxProfit = max(maxProfit, price - minPrice)
return maxProfit`
    },
    {
        id: 2,
        patternId: 1,
        title: "Move Zeroes",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/move-zeroes/",
        hint: "Use two pointers - one for placing non-zeros",
        approach: "Two-pointer technique. One pointer tracks position to place next non-zero, other iterates through array.",
        complexity: "Time: O(n) | Space: O(1)",
        keyInsight: "Swap non-zero elements to the front, zeros naturally move to back.",
        pseudocode: `insertPos = 0
for i in range(len(nums)):
    if nums[i] != 0:
        nums[insertPos], nums[i] = nums[i], nums[insertPos]
        insertPos += 1`
    },
    {
        id: 3,
        patternId: 1,
        title: "Plus One",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/plus-one/",
        hint: "Handle carry from right to left",
        approach: "Start from rightmost digit. Add one, handle carry. If all 9s, need extra digit at front.",
        complexity: "Time: O(n) | Space: O(1) or O(n) if new array needed",
        keyInsight: "Only edge case is when all digits are 9 (999 → 1000).",
        pseudocode: `for i in range(len(digits)-1, -1, -1):
    if digits[i] < 9:
        digits[i] += 1
        return digits
    digits[i] = 0
return [1] + digits  # all were 9s`
    },
    {
        id: 4,
        patternId: 1,
        title: "Merge Sorted Array",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/merge-sorted-array/",
        hint: "Start from the end to avoid overwriting",
        approach: "Three pointers from end. Compare and place larger element at the back of nums1.",
        complexity: "Time: O(m+n) | Space: O(1)",
        keyInsight: "Merging from back prevents overwriting unprocessed elements in nums1.",
        pseudocode: `p1, p2, p = m-1, n-1, m+n-1
while p2 >= 0:
    if p1 >= 0 and nums1[p1] > nums2[p2]:
        nums1[p] = nums1[p1]
        p1 -= 1
    else:
        nums1[p] = nums2[p2]
        p2 -= 1
    p -= 1`
    },
    {
        id: 5,
        patternId: 1,
        title: "Find Pivot Index",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/find-pivot-index/",
        hint: "Left sum equals total sum minus left sum minus current element",
        approach: "Calculate total sum first. Iterate and check if leftSum == totalSum - leftSum - nums[i].",
        complexity: "Time: O(n) | Space: O(1)",
        keyInsight: "rightSum = totalSum - leftSum - pivot. Find where leftSum == rightSum.",
        pseudocode: `total = sum(nums)
leftSum = 0
for i, num in enumerate(nums):
    if leftSum == total - leftSum - num:
        return i
    leftSum += num
return -1`
    },

    // ============================================
    // 2️⃣ Two Pointers
    // ============================================
    {
        id: 6,
        patternId: 2,
        title: "Two Sum II – Input Array Is Sorted",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
        hint: "Use two pointers from both ends",
        approach: "Left pointer at start, right at end. If sum too small, move left. If too big, move right.",
        complexity: "Time: O(n) | Space: O(1)",
        keyInsight: "Sorted array means we can use binary elimination with two pointers.",
        pseudocode: `left, right = 0, len(nums) - 1
while left < right:
    sum = nums[left] + nums[right]
    if sum == target:
        return [left+1, right+1]
    elif sum < target:
        left += 1
    else:
        right -= 1`
    },
    {
        id: 7,
        patternId: 2,
        title: "Container With Most Water",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/container-with-most-water/",
        hint: "Move the shorter line inward",
        approach: "Two pointers at ends. Calculate area, move the shorter side inward hoping to find taller line.",
        complexity: "Time: O(n) | Space: O(1)",
        keyInsight: "Moving shorter line might find taller one. Moving taller line can only decrease area.",
        pseudocode: `left, right = 0, len(height) - 1
maxArea = 0
while left < right:
    area = min(height[left], height[right]) * (right - left)
    maxArea = max(maxArea, area)
    if height[left] < height[right]:
        left += 1
    else:
        right -= 1
return maxArea`
    },
    {
        id: 8,
        patternId: 2,
        title: "Remove Duplicates from Sorted Array",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
        hint: "Slow pointer for unique position, fast for scanning",
        approach: "Two pointers: slow marks position for next unique, fast scans ahead.",
        complexity: "Time: O(n) | Space: O(1)",
        keyInsight: "In sorted array, duplicates are adjacent. Skip them with fast pointer.",
        pseudocode: `if not nums: return 0
slow = 0
for fast in range(1, len(nums)):
    if nums[fast] != nums[slow]:
        slow += 1
        nums[slow] = nums[fast]
return slow + 1`
    },
    {
        id: 9,
        patternId: 2,
        title: "Valid Palindrome",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/valid-palindrome/",
        hint: "Compare alphanumeric characters from both ends",
        approach: "Two pointers from ends, skip non-alphanumeric, compare lowercase characters.",
        complexity: "Time: O(n) | Space: O(1)",
        keyInsight: "Skip non-alphanumeric chars, compare case-insensitively.",
        pseudocode: `left, right = 0, len(s) - 1
while left < right:
    while left < right and not s[left].isalnum():
        left += 1
    while left < right and not s[right].isalnum():
        right -= 1
    if s[left].lower() != s[right].lower():
        return False
    left += 1
    right -= 1
return True`
    },
    {
        id: 10,
        patternId: 2,
        title: "3Sum",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/3sum/",
        hint: "Sort array, fix one element, use two pointers for remaining two",
        approach: "Sort array. For each element, use two-pointer technique to find pairs that sum to its negative.",
        complexity: "Time: O(n²) | Space: O(1) excluding output",
        keyInsight: "Sort + skip duplicates + two pointers. Fix first element, two-sum on rest.",
        pseudocode: `nums.sort()
result = []
for i in range(len(nums)-2):
    if i > 0 and nums[i] == nums[i-1]: continue
    left, right = i+1, len(nums)-1
    while left < right:
        total = nums[i] + nums[left] + nums[right]
        if total == 0:
            result.append([nums[i], nums[left], nums[right]])
            # skip duplicates
        elif total < 0: left += 1
        else: right -= 1`
    },

    // ============================================
    // 3️⃣ Sliding Window
    // ============================================
    {
        id: 11,
        patternId: 3,
        title: "Maximum Average Subarray I",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/maximum-average-subarray-i/",
        hint: "Fixed-size sliding window",
        approach: "Calculate sum of first k elements. Slide window: add next, remove first. Track max sum.",
        complexity: "Time: O(n) | Space: O(1)",
        keyInsight: "Fixed window size k. Slide by adding one element and removing one.",
        pseudocode: `windowSum = sum(nums[:k])
maxSum = windowSum
for i in range(k, len(nums)):
    windowSum += nums[i] - nums[i-k]
    maxSum = max(maxSum, windowSum)
return maxSum / k`
    },
    {
        id: 12,
        patternId: 3,
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        hint: "Expand window, shrink when duplicate found",
        approach: "Use set/hashmap to track chars in window. Expand right, shrink left when duplicate found.",
        complexity: "Time: O(n) | Space: O(min(m,n)) where m is charset size",
        keyInsight: "Variable window. Shrink from left when constraint violated (duplicate char).",
        pseudocode: `charSet = set()
left = maxLen = 0
for right in range(len(s)):
    while s[right] in charSet:
        charSet.remove(s[left])
        left += 1
    charSet.add(s[right])
    maxLen = max(maxLen, right - left + 1)
return maxLen`
    },
    {
        id: 13,
        patternId: 3,
        title: "Minimum Window Substring",
        difficulty: "Hard",
        link: "https://leetcode.com/problems/minimum-window-substring/",
        hint: "Expand to include all chars, shrink to minimize",
        approach: "Two pointers. Expand right until all chars included, then shrink left to minimize window.",
        complexity: "Time: O(n) | Space: O(m) where m is charset",
        keyInsight: "Expand until valid, shrink while valid, track minimum.",
        pseudocode: `need = Counter(t)
have, required = 0, len(need)
left = 0
result = ""
for right, char in enumerate(s):
    if char in need:
        # update window counts
    while have == required:
        # update result if smaller
        # shrink from left
return result`
    },
    {
        id: 14,
        patternId: 3,
        title: "Longest Repeating Character Replacement",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/longest-repeating-character-replacement/",
        hint: "Window is valid if (length - maxFreq) <= k",
        approach: "Track frequency of chars in window. Window valid if we can replace (windowLen - maxFreq) chars with k operations.",
        complexity: "Time: O(n) | Space: O(26) = O(1)",
        keyInsight: "Valid window: length - maxFreqChar <= k (replacements needed).",
        pseudocode: `count = {}
maxFreq = left = result = 0
for right in range(len(s)):
    count[s[right]] = count.get(s[right], 0) + 1
    maxFreq = max(maxFreq, count[s[right]])
    while (right - left + 1) - maxFreq > k:
        count[s[left]] -= 1
        left += 1
    result = max(result, right - left + 1)
return result`
    },
    {
        id: 15,
        patternId: 3,
        title: "Permutation in String",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/permutation-in-string/",
        hint: "Fixed window size = len(s1), check if frequency matches",
        approach: "Sliding window of size len(s1). Compare frequency counts of window with s1.",
        complexity: "Time: O(n) | Space: O(26) = O(1)",
        keyInsight: "Permutation = same character frequencies. Fixed window size.",
        pseudocode: `if len(s1) > len(s2): return False
s1Count = Counter(s1)
windowCount = Counter(s2[:len(s1)])
if s1Count == windowCount: return True
for i in range(len(s1), len(s2)):
    windowCount[s2[i]] += 1
    windowCount[s2[i-len(s1)]] -= 1
    # cleanup zero counts
    if s1Count == windowCount: return True
return False`
    },

    // ============================================
    // 4️⃣ Prefix Sum
    // ============================================
    {
        id: 16,
        patternId: 4,
        title: "Range Sum Query – Immutable",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/range-sum-query-immutable/",
        hint: "Precompute prefix sums for O(1) range queries",
        approach: "Build prefix sum array. Range sum = prefix[right+1] - prefix[left].",
        complexity: "Time: O(1) query, O(n) preprocess | Space: O(n)",
        keyInsight: "prefix[i] = sum of elements from 0 to i-1. Range sum is difference of two prefix sums.",
        pseudocode: `# Preprocess
prefix = [0]
for num in nums:
    prefix.append(prefix[-1] + num)

# Query
def sumRange(left, right):
    return prefix[right+1] - prefix[left]`
    },
    {
        id: 17,
        patternId: 4,
        title: "Subarray Sum Equals K",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/subarray-sum-equals-k/",
        hint: "Use hashmap to store prefix sum frequencies",
        approach: "Track prefix sums in hashmap. For each prefix sum, check if (prefixSum - k) exists in map.",
        complexity: "Time: O(n) | Space: O(n)",
        keyInsight: "If prefixSum[j] - prefixSum[i] = k, then subarray [i+1, j] sums to k.",
        pseudocode: `count = 0
prefixSum = 0
sumCount = {0: 1}  # empty prefix
for num in nums:
    prefixSum += num
    if prefixSum - k in sumCount:
        count += sumCount[prefixSum - k]
    sumCount[prefixSum] = sumCount.get(prefixSum, 0) + 1
return count`
    },
    {
        id: 18,
        patternId: 4,
        title: "Find the Middle Index in Array",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/find-the-middle-index-in-array/",
        hint: "Similar to Pivot Index - left sum equals right sum",
        approach: "Calculate total sum. Iterate and check if leftSum equals rightSum (total - leftSum - current).",
        complexity: "Time: O(n) | Space: O(1)",
        keyInsight: "Middle index: leftSum == totalSum - leftSum - nums[i].",
        pseudocode: `total = sum(nums)
leftSum = 0
for i, num in enumerate(nums):
    if leftSum == total - leftSum - num:
        return i
    leftSum += num
return -1`
    },
    {
        id: 19,
        patternId: 4,
        title: "Continuous Subarray Sum",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/continuous-subarray-sum/",
        hint: "Use modulo and hashmap - if same remainder appears twice, difference is divisible by k",
        approach: "Store (prefixSum % k) in map. If same remainder seen before (with gap >= 2), subarray sum is multiple of k.",
        complexity: "Time: O(n) | Space: O(min(n, k))",
        keyInsight: "If prefix[j] % k == prefix[i] % k, then sum[i+1..j] is divisible by k.",
        pseudocode: `remainderIndex = {0: -1}
prefixSum = 0
for i, num in enumerate(nums):
    prefixSum += num
    remainder = prefixSum % k
    if remainder in remainderIndex:
        if i - remainderIndex[remainder] >= 2:
            return True
    else:
        remainderIndex[remainder] = i
return False`
    },
    {
        id: 20,
        patternId: 4,
        title: "Product of Array Except Self",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/product-of-array-except-self/",
        hint: "Use prefix and suffix products",
        approach: "Two passes: first builds prefix products (left to right), second multiplies by suffix products (right to left).",
        complexity: "Time: O(n) | Space: O(1) excluding output",
        keyInsight: "result[i] = product of all elements left of i × product of all elements right of i.",
        pseudocode: `n = len(nums)
result = [1] * n
# Prefix products
prefix = 1
for i in range(n):
    result[i] = prefix
    prefix *= nums[i]
# Suffix products
suffix = 1
for i in range(n-1, -1, -1):
    result[i] *= suffix
    suffix *= nums[i]
return result`
    },

    // ============================================
    // 5️⃣ Hashing / Frequency Map
    // ============================================
    {
        id: 21,
        patternId: 5,
        title: "Two Sum",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/two-sum/",
        hint: "Use hashmap to store number and its index",
        approach: "For each number, check if (target - num) exists in hashmap. If not, add current num to map.",
        complexity: "Time: O(n) | Space: O(n)",
        keyInsight: "Complement = target - current. Check if complement already seen.",
        pseudocode: `numMap = {}
for i, num in enumerate(nums):
    complement = target - num
    if complement in numMap:
        return [numMap[complement], i]
    numMap[num] = i`
    },
    {
        id: 22,
        patternId: 5,
        title: "Group Anagrams",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/group-anagrams/",
        hint: "Use sorted string or character count as key",
        approach: "Group strings by their sorted version (anagram signature). Use hashmap with sorted string as key.",
        complexity: "Time: O(n × k log k) | Space: O(n × k) where k is max string length",
        keyInsight: "Anagrams have same sorted form. Use sorted string as hashmap key.",
        pseudocode: `groups = defaultdict(list)
for s in strs:
    key = ''.join(sorted(s))
    groups[key].append(s)
return list(groups.values())`
    },
    {
        id: 23,
        patternId: 5,
        title: "Top K Frequent Elements",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/top-k-frequent-elements/",
        hint: "Count frequencies, then find top k (bucket sort or heap)",
        approach: "Count frequencies with hashmap. Use bucket sort (index = frequency) or min-heap for top k.",
        complexity: "Time: O(n) bucket sort / O(n log k) heap | Space: O(n)",
        keyInsight: "Bucket sort: buckets[freq] = list of nums with that freq. Iterate from high freq.",
        pseudocode: `count = Counter(nums)
# Bucket sort approach
buckets = [[] for _ in range(len(nums)+1)]
for num, freq in count.items():
    buckets[freq].append(num)
result = []
for i in range(len(buckets)-1, -1, -1):
    result.extend(buckets[i])
    if len(result) >= k:
        return result[:k]`
    },
    {
        id: 24,
        patternId: 5,
        title: "First Unique Character in a String",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/first-unique-character-in-a-string/",
        hint: "Count frequencies, then find first with count 1",
        approach: "Two passes: first counts frequencies, second finds first char with count 1.",
        complexity: "Time: O(n) | Space: O(26) = O(1)",
        keyInsight: "First pass: count. Second pass: find first char with count == 1.",
        pseudocode: `count = Counter(s)
for i, char in enumerate(s):
    if count[char] == 1:
        return i
return -1`
    },
    {
        id: 25,
        patternId: 5,
        title: "Longest Consecutive Sequence",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/longest-consecutive-sequence/",
        hint: "Use set for O(1) lookup, only start counting from sequence start",
        approach: "Add all to set. For each num, if (num-1) not in set (it's a sequence start), count consecutive nums.",
        complexity: "Time: O(n) | Space: O(n)",
        keyInsight: "Only start counting from sequence beginning (when num-1 doesn't exist).",
        pseudocode: `numSet = set(nums)
maxLen = 0
for num in numSet:
    if num - 1 not in numSet:  # start of sequence
        length = 1
        while num + length in numSet:
            length += 1
        maxLen = max(maxLen, length)
return maxLen`
    },

    // ============================================
    // 6️⃣ Sorting + Greedy
    // ============================================
    {
        id: 26,
        patternId: 6,
        title: "Merge Intervals",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/merge-intervals/",
        hint: "Sort by start time, merge overlapping intervals",
        approach: "Sort by start. Iterate and merge if current start <= prev end. Extend end if needed.",
        complexity: "Time: O(n log n) | Space: O(n)",
        keyInsight: "After sorting, overlapping intervals are adjacent. Merge if start <= prev_end.",
        pseudocode: `intervals.sort(key=lambda x: x[0])
merged = [intervals[0]]
for start, end in intervals[1:]:
    if start <= merged[-1][1]:
        merged[-1][1] = max(merged[-1][1], end)
    else:
        merged.append([start, end])
return merged`
    },
    {
        id: 27,
        patternId: 6,
        title: "Non-overlapping Intervals",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/non-overlapping-intervals/",
        hint: "Sort by end time, greedily keep intervals that end earliest",
        approach: "Sort by end time. Greedily keep intervals that don't overlap with last kept. Count removals.",
        complexity: "Time: O(n log n) | Space: O(1)",
        keyInsight: "Keep interval that ends earliest (leaves most room). Remove = total - kept.",
        pseudocode: `intervals.sort(key=lambda x: x[1])
kept = 0
prevEnd = float('-inf')
for start, end in intervals:
    if start >= prevEnd:
        kept += 1
        prevEnd = end
return len(intervals) - kept`
    },
    {
        id: 28,
        patternId: 6,
        title: "Task Scheduler",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/task-scheduler/",
        hint: "Most frequent task determines minimum time",
        approach: "Count frequencies. Most frequent task creates frame. Fill gaps with other tasks or idle.",
        complexity: "Time: O(n) | Space: O(26) = O(1)",
        keyInsight: "Min time = (maxFreq - 1) × (n + 1) + countOfMaxFreq. Compare with tasks length.",
        pseudocode: `count = Counter(tasks)
maxFreq = max(count.values())
maxCount = sum(1 for c in count.values() if c == maxFreq)
# Formula: slots needed for most frequent tasks
result = (maxFreq - 1) * (n + 1) + maxCount
# At minimum, we need len(tasks) time
return max(result, len(tasks))`
    },
    {
        id: 29,
        patternId: 6,
        title: "Minimum Number of Arrows to Burst Balloons",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/",
        hint: "Sort by end point, shoot at end of first balloon",
        approach: "Sort by end. Shoot at end of current balloon. Skip all balloons that this arrow bursts.",
        complexity: "Time: O(n log n) | Space: O(1)",
        keyInsight: "Greedy: shoot at rightmost point of leftmost-ending balloon.",
        pseudocode: `points.sort(key=lambda x: x[1])
arrows = 1
arrowPos = points[0][1]
for start, end in points[1:]:
    if start > arrowPos:
        arrows += 1
        arrowPos = end
return arrows`
    },
    {
        id: 30,
        patternId: 6,
        title: "Assign Cookies",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/assign-cookies/",
        hint: "Sort both arrays, greedily assign smallest sufficient cookie",
        approach: "Sort children by greed, cookies by size. Greedily assign smallest cookie that satisfies each child.",
        complexity: "Time: O(n log n + m log m) | Space: O(1)",
        keyInsight: "Give smallest sufficient cookie to least greedy child first.",
        pseudocode: `g.sort()  # children greed
s.sort()  # cookie sizes
child = cookie = 0
while child < len(g) and cookie < len(s):
    if s[cookie] >= g[child]:
        child += 1
    cookie += 1
return child`
    },

    // ============================================
    // 7️⃣ Binary Search (Classic)
    // ============================================
    {
        id: 31,
        patternId: 7,
        title: "Binary Search",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/binary-search/",
        hint: "Classic binary search - narrow search space by half each time",
        approach: "Compare middle element with target. Eliminate half of search space each iteration.",
        complexity: "Time: O(log n) | Space: O(1)",
        keyInsight: "If nums[mid] < target, search right half. If nums[mid] > target, search left half.",
        pseudocode: `left, right = 0, len(nums) - 1
while left <= right:
    mid = (left + right) // 2
    if nums[mid] == target:
        return mid
    elif nums[mid] < target:
        left = mid + 1
    else:
        right = mid - 1
return -1`
    },
    {
        id: 32,
        patternId: 7,
        title: "Search Insert Position",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/search-insert-position/",
        hint: "Find leftmost position where target could be inserted",
        approach: "Binary search variant. Find position where target should be inserted to maintain sorted order.",
        complexity: "Time: O(log n) | Space: O(1)",
        keyInsight: "Return left pointer when search ends - it's the insertion position.",
        pseudocode: `left, right = 0, len(nums)
while left < right:
    mid = (left + right) // 2
    if nums[mid] < target:
        left = mid + 1
    else:
        right = mid
return left`
    },
    {
        id: 33,
        patternId: 7,
        title: "Find First and Last Position of Element",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
        hint: "Two binary searches: one for first occurrence, one for last",
        approach: "Use binary search twice: find leftmost target (lower bound) and rightmost target (upper bound).",
        complexity: "Time: O(log n) | Space: O(1)",
        keyInsight: "Lower bound: move right = mid when nums[mid] >= target. Upper bound: opposite.",
        pseudocode: `def findFirst(nums, target):
    left, right = 0, len(nums)
    while left < right:
        mid = (left + right) // 2
        if nums[mid] < target: left = mid + 1
        else: right = mid
    return left

def findLast(nums, target):
    left, right = 0, len(nums)
    while left < right:
        mid = (left + right) // 2
        if nums[mid] <= target: left = mid + 1
        else: right = mid
    return left - 1`
    },
    {
        id: 34,
        patternId: 7,
        title: "Search in Rotated Sorted Array",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
        hint: "One half is always sorted - determine which half target is in",
        approach: "Find which half is sorted. Check if target is in sorted half, adjust search accordingly.",
        complexity: "Time: O(log n) | Space: O(1)",
        keyInsight: "At least one half is sorted. Check if target falls in sorted range.",
        pseudocode: `left, right = 0, len(nums) - 1
while left <= right:
    mid = (left + right) // 2
    if nums[mid] == target: return mid
    if nums[left] <= nums[mid]:  # left half sorted
        if nums[left] <= target < nums[mid]:
            right = mid - 1
        else:
            left = mid + 1
    else:  # right half sorted
        if nums[mid] < target <= nums[right]:
            left = mid + 1
        else:
            right = mid - 1
return -1`
    },
    {
        id: 35,
        patternId: 7,
        title: "Find Minimum in Rotated Sorted Array",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
        hint: "Compare middle with rightmost element",
        approach: "If nums[mid] > nums[right], min is in right half. Otherwise, min is in left half (including mid).",
        complexity: "Time: O(log n) | Space: O(1)",
        keyInsight: "Minimum is at rotation point. Compare mid with right to determine which half.",
        pseudocode: `left, right = 0, len(nums) - 1
while left < right:
    mid = (left + right) // 2
    if nums[mid] > nums[right]:
        left = mid + 1  # min in right half
    else:
        right = mid  # min in left half (incl mid)
return nums[left]`
    },

    // ============================================
    // 8️⃣ Binary Search on Answer
    // ============================================
    {
        id: 36,
        patternId: 8,
        title: "Koko Eating Bananas",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/koko-eating-bananas/",
        hint: "Binary search on eating speed k",
        approach: "Binary search on answer (speed k). For each k, check if Koko can finish in h hours.",
        complexity: "Time: O(n log m) where m is max pile | Space: O(1)",
        keyInsight: "Search space: k ∈ [1, max(piles)]. Check feasibility for each speed.",
        pseudocode: `def canFinish(piles, k, h):
    hours = sum(ceil(p / k) for p in piles)
    return hours <= h

left, right = 1, max(piles)
while left < right:
    mid = (left + right) // 2
    if canFinish(piles, mid, h):
        right = mid
    else:
        left = mid + 1
return left`
    },
    {
        id: 37,
        patternId: 8,
        title: "Capacity To Ship Packages Within D Days",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
        hint: "Binary search on ship capacity",
        approach: "Binary search on capacity. For each capacity, simulate shipping and count days needed.",
        complexity: "Time: O(n log sum) | Space: O(1)",
        keyInsight: "Min capacity = max(weights), Max = sum(weights). Binary search between.",
        pseudocode: `def canShip(weights, capacity, days):
    dayCount = 1
    currentLoad = 0
    for w in weights:
        if currentLoad + w > capacity:
            dayCount += 1
            currentLoad = 0
        currentLoad += w
    return dayCount <= days

left, right = max(weights), sum(weights)
while left < right:
    mid = (left + right) // 2
    if canShip(weights, mid, days):
        right = mid
    else:
        left = mid + 1
return left`
    },
    {
        id: 38,
        patternId: 8,
        title: "Split Array Largest Sum",
        difficulty: "Hard",
        link: "https://leetcode.com/problems/split-array-largest-sum/",
        hint: "Binary search on the maximum sum allowed per subarray",
        approach: "Binary search on max sum. For each max sum, greedily count minimum subarrays needed.",
        complexity: "Time: O(n log sum) | Space: O(1)",
        keyInsight: "Minimize the maximum sum. Binary search on answer, check if k subarrays suffice.",
        pseudocode: `def canSplit(nums, maxSum, k):
    count = 1
    currentSum = 0
    for num in nums:
        if currentSum + num > maxSum:
            count += 1
            currentSum = 0
        currentSum += num
    return count <= k

left, right = max(nums), sum(nums)
while left < right:
    mid = (left + right) // 2
    if canSplit(nums, mid, k):
        right = mid
    else:
        left = mid + 1
return left`
    },
    {
        id: 39,
        patternId: 8,
        title: "Minimum Number of Days to Make M Bouquets",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/",
        hint: "Binary search on days, check if m bouquets can be made",
        approach: "Binary search on days. For each day, count bouquets from consecutive bloomed flowers.",
        complexity: "Time: O(n log max) | Space: O(1)",
        keyInsight: "Binary search on days. flowers[i] <= day means it's bloomed.",
        pseudocode: `def canMake(bloomDay, day, m, k):
    bouquets = 0
    consecutive = 0
    for bloom in bloomDay:
        if bloom <= day:
            consecutive += 1
            if consecutive == k:
                bouquets += 1
                consecutive = 0
        else:
            consecutive = 0
    return bouquets >= m

left, right = min(bloomDay), max(bloomDay)
result = -1
while left <= right:
    mid = (left + right) // 2
    if canMake(bloomDay, mid, m, k):
        result = mid
        right = mid - 1
    else:
        left = mid + 1
return result`
    },
    {
        id: 40,
        patternId: 8,
        title: "Aggressive Cows",
        difficulty: "Hard",
        link: "https://www.spoj.com/problems/AGGRCOW/",
        hint: "Binary search on minimum distance between cows",
        approach: "Binary search on minimum distance. Greedily place cows and check if all can be placed.",
        complexity: "Time: O(n log range) | Space: O(1)",
        keyInsight: "Maximize minimum distance. Binary search on distance, greedily place cows.",
        pseudocode: `stalls.sort()
def canPlace(stalls, dist, cows):
    count = 1
    lastPos = stalls[0]
    for pos in stalls[1:]:
        if pos - lastPos >= dist:
            count += 1
            lastPos = pos
    return count >= cows

left, right = 1, stalls[-1] - stalls[0]
result = 0
while left <= right:
    mid = (left + right) // 2
    if canPlace(stalls, mid, cows):
        result = mid
        left = mid + 1
    else:
        right = mid - 1
return result`
    },

    // ============================================
    // 9️⃣ Stack (Monotonic Stack)
    // ============================================
    {
        id: 41,
        patternId: 9,
        title: "Valid Parentheses",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/valid-parentheses/",
        hint: "Use stack to match opening and closing brackets",
        approach: "Push opening brackets. For closing, check if top matches. Stack should be empty at end.",
        complexity: "Time: O(n) | Space: O(n)",
        keyInsight: "Stack ensures LIFO matching of brackets. Each close must match most recent open.",
        pseudocode: `stack = []
pairs = {')': '(', '}': '{', ']': '['}
for char in s:
    if char in '({[':
        stack.append(char)
    else:
        if not stack or stack[-1] != pairs[char]:
            return False
        stack.pop()
return len(stack) == 0`
    },
    {
        id: 42,
        patternId: 9,
        title: "Next Greater Element I",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/next-greater-element-i/",
        hint: "Use monotonic decreasing stack",
        approach: "Process nums2 with monotonic decreasing stack. When larger element found, it's the NGE for all smaller elements popped.",
        complexity: "Time: O(n) | Space: O(n)",
        keyInsight: "Monotonic stack: when we see larger element, pop all smaller and record their NGE.",
        pseudocode: `nge = {}
stack = []
for num in nums2:
    while stack and stack[-1] < num:
        nge[stack.pop()] = num
    stack.append(num)
return [nge.get(num, -1) for num in nums1]`
    },
    {
        id: 43,
        patternId: 9,
        title: "Daily Temperatures",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/daily-temperatures/",
        hint: "Stack stores indices, find next warmer day",
        approach: "Monotonic decreasing stack of indices. When warmer day found, calculate days difference.",
        complexity: "Time: O(n) | Space: O(n)",
        keyInsight: "Stack holds indices of days waiting for warmer temperature.",
        pseudocode: `result = [0] * len(temperatures)
stack = []  # stores indices
for i, temp in enumerate(temperatures):
    while stack and temperatures[stack[-1]] < temp:
        prevIdx = stack.pop()
        result[prevIdx] = i - prevIdx
    stack.append(i)
return result`
    },
    {
        id: 44,
        patternId: 9,
        title: "Largest Rectangle in Histogram",
        difficulty: "Hard",
        link: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
        hint: "Monotonic increasing stack, calculate area when popping",
        approach: "Maintain monotonic increasing stack. When smaller bar found, pop and calculate areas.",
        complexity: "Time: O(n) | Space: O(n)",
        keyInsight: "For each bar, find how far it extends left and right. Stack helps find boundaries.",
        pseudocode: `stack = []
maxArea = 0
heights.append(0)  # trigger final pops
for i, h in enumerate(heights):
    while stack and heights[stack[-1]] > h:
        height = heights[stack.pop()]
        width = i if not stack else i - stack[-1] - 1
        maxArea = max(maxArea, height * width)
    stack.append(i)
return maxArea`
    },
    {
        id: 45,
        patternId: 9,
        title: "Min Stack",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/min-stack/",
        hint: "Track minimum at each stack state",
        approach: "Store pairs of (value, currentMin). Each push updates min if necessary.",
        complexity: "Time: O(1) all operations | Space: O(n)",
        keyInsight: "Store minimum alongside each element, or use auxiliary min stack.",
        pseudocode: `class MinStack:
    def __init__(self):
        self.stack = []  # (val, min_so_far)
    
    def push(self, val):
        minVal = min(val, self.stack[-1][1] if self.stack else val)
        self.stack.append((val, minVal))
    
    def pop(self):
        self.stack.pop()
    
    def getMin(self):
        return self.stack[-1][1]`
    },

    // ============================================
    // 🔟 Queue / Deque
    // ============================================
    {
        id: 46,
        patternId: 10,
        title: "Sliding Window Maximum",
        difficulty: "Hard",
        link: "https://leetcode.com/problems/sliding-window-maximum/",
        hint: "Use monotonic decreasing deque",
        approach: "Maintain deque of indices in decreasing order of values. Front is always maximum in window.",
        complexity: "Time: O(n) | Space: O(k)",
        keyInsight: "Deque front = max. Remove smaller elements from back. Remove out-of-window from front.",
        pseudocode: `from collections import deque
dq = deque()  # stores indices
result = []
for i, num in enumerate(nums):
    # Remove elements outside window
    while dq and dq[0] <= i - k:
        dq.popleft()
    # Remove smaller elements
    while dq and nums[dq[-1]] < num:
        dq.pop()
    dq.append(i)
    if i >= k - 1:
        result.append(nums[dq[0]])
return result`
    },
    {
        id: 47,
        patternId: 10,
        title: "Implement Queue using Stacks",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/implement-queue-using-stacks/",
        hint: "Use two stacks - one for push, one for pop",
        approach: "Push stack for enqueue. When dequeue needed, transfer all to pop stack (reverses order).",
        complexity: "Time: Amortized O(1) | Space: O(n)",
        keyInsight: "Reversing stack twice gives original order. Transfer only when pop stack empty.",
        pseudocode: `class MyQueue:
    def __init__(self):
        self.pushStack = []
        self.popStack = []
    
    def push(self, x):
        self.pushStack.append(x)
    
    def pop(self):
        self._transfer()
        return self.popStack.pop()
    
    def _transfer(self):
        if not self.popStack:
            while self.pushStack:
                self.popStack.append(self.pushStack.pop())`
    },
    {
        id: 48,
        patternId: 10,
        title: "Design Circular Queue",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/design-circular-queue/",
        hint: "Use array with front and rear pointers, modulo for wrapping",
        approach: "Fixed size array. Track front, rear, count. Use modulo for circular indexing.",
        complexity: "Time: O(1) all operations | Space: O(k)",
        keyInsight: "Circular indexing: (index + 1) % size. Track count for empty/full checks.",
        pseudocode: `class CircularQueue:
    def __init__(self, k):
        self.queue = [None] * k
        self.size = k
        self.front = 0
        self.count = 0
    
    def enQueue(self, val):
        if self.isFull(): return False
        rear = (self.front + self.count) % self.size
        self.queue[rear] = val
        self.count += 1
        return True
    
    def deQueue(self):
        if self.isEmpty(): return False
        self.front = (self.front + 1) % self.size
        self.count -= 1
        return True`
    },
    {
        id: 49,
        patternId: 10,
        title: "First Unique Character in a String",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/first-unique-character-in-a-string/",
        hint: "Use queue with frequency map for streaming",
        approach: "For streaming: queue holds candidates, map tracks frequency. Pop from front until unique found.",
        complexity: "Time: O(n) | Space: O(26) = O(1)",
        keyInsight: "Queue maintains order, map tracks frequency. Poll queue until front is unique.",
        pseudocode: `# Simple approach (non-streaming)
count = Counter(s)
for i, char in enumerate(s):
    if count[char] == 1:
        return i
return -1

# Streaming with queue
queue = deque()
count = {}
for char in stream:
    count[char] = count.get(char, 0) + 1
    queue.append(char)
    while queue and count[queue[0]] > 1:
        queue.popleft()
    yield queue[0] if queue else None`
    },
    {
        id: 50,
        patternId: 10,
        title: "Moving Average from Data Stream",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/moving-average-from-data-stream/",
        hint: "Use queue to maintain window, track running sum",
        approach: "Queue of fixed size k. Maintain running sum. Add new, remove old if size exceeds k.",
        complexity: "Time: O(1) per operation | Space: O(k)",
        keyInsight: "Queue maintains last k elements. Update sum incrementally.",
        pseudocode: `class MovingAverage:
    def __init__(self, size):
        self.queue = deque()
        self.size = size
        self.total = 0
    
    def next(self, val):
        self.queue.append(val)
        self.total += val
        if len(self.queue) > self.size:
            self.total -= self.queue.popleft()
        return self.total / len(self.queue)`
    },

    // ============================================
    // 1️⃣1️⃣ Linked List
    // ============================================
    {
        id: 51,
        patternId: 11,
        title: "Reverse Linked List",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/reverse-linked-list/",
        hint: "Track previous, current, and next pointers",
        approach: "Iteratively reverse pointers. Keep track of prev, curr, next. Point curr.next to prev.",
        complexity: "Time: O(n) | Space: O(1)",
        keyInsight: "Save next before reversing pointer. Three pointers: prev, curr, next.",
        pseudocode: `prev = None
curr = head
while curr:
    next_temp = curr.next
    curr.next = prev
    prev = curr
    curr = next_temp
return prev`
    },
    {
        id: 52,
        patternId: 11,
        title: "Linked List Cycle",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/linked-list-cycle/",
        hint: "Floyd's cycle detection - slow and fast pointers",
        approach: "Slow moves 1 step, fast moves 2 steps. If they meet, there's a cycle.",
        complexity: "Time: O(n) | Space: O(1)",
        keyInsight: "If cycle exists, fast will eventually catch slow. Like runners on circular track.",
        pseudocode: `slow = fast = head
while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
    if slow == fast:
        return True
return False`
    },
    {
        id: 53,
        patternId: 11,
        title: "Merge Two Sorted Lists",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/merge-two-sorted-lists/",
        hint: "Use dummy head, compare and link smaller node",
        approach: "Create dummy head. Compare nodes from both lists, append smaller one. Handle remaining.",
        complexity: "Time: O(n + m) | Space: O(1)",
        keyInsight: "Dummy head simplifies edge cases. Just compare and link.",
        pseudocode: `dummy = ListNode(0)
curr = dummy
while l1 and l2:
    if l1.val <= l2.val:
        curr.next = l1
        l1 = l1.next
    else:
        curr.next = l2
        l2 = l2.next
    curr = curr.next
curr.next = l1 or l2
return dummy.next`
    },
    {
        id: 54,
        patternId: 11,
        title: "Remove Nth Node From End",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
        hint: "Two pointers with n gap between them",
        approach: "Move fast pointer n steps ahead. Then move both until fast reaches end. Slow is at node before target.",
        complexity: "Time: O(n) | Space: O(1)",
        keyInsight: "When fast is at end, slow is n nodes behind (at node to remove).",
        pseudocode: `dummy = ListNode(0, head)
fast = slow = dummy
for _ in range(n + 1):
    fast = fast.next
while fast:
    fast = fast.next
    slow = slow.next
slow.next = slow.next.next
return dummy.next`
    },
    {
        id: 55,
        patternId: 11,
        title: "Intersection of Two Linked Lists",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/intersection-of-two-linked-lists/",
        hint: "Switch heads when reaching end - they'll meet at intersection",
        approach: "Two pointers traverse both lists. When one ends, start at other's head. They meet at intersection or both null.",
        complexity: "Time: O(n + m) | Space: O(1)",
        keyInsight: "a + c + b = b + c + a. Both traverse same total distance.",
        pseudocode: `pA, pB = headA, headB
while pA != pB:
    pA = pA.next if pA else headB
    pB = pB.next if pB else headA
return pA  # intersection or None`
    },

    // ============================================
    // 1️⃣2️⃣ Tree Traversal
    // ============================================
    {
        id: 56,
        patternId: 12,
        title: "Binary Tree Inorder Traversal",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
        hint: "Left → Root → Right. Use recursion or stack.",
        approach: "Recursive: visit left subtree, process root, visit right subtree. Iterative: use stack.",
        complexity: "Time: O(n) | Space: O(h) where h is height",
        keyInsight: "Inorder on BST gives sorted order. Stack simulates recursion.",
        pseudocode: `# Iterative with stack
result = []
stack = []
curr = root
while curr or stack:
    while curr:
        stack.append(curr)
        curr = curr.left
    curr = stack.pop()
    result.append(curr.val)
    curr = curr.right
return result`
    },
    {
        id: 57,
        patternId: 12,
        title: "Maximum Depth of Binary Tree",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
        hint: "Depth = 1 + max(left depth, right depth)",
        approach: "Recursively compute depth of left and right subtrees. Return 1 + max of both.",
        complexity: "Time: O(n) | Space: O(h)",
        keyInsight: "Base case: null node has depth 0. Recursively find max depth of children.",
        pseudocode: `def maxDepth(root):
    if not root:
        return 0
    return 1 + max(maxDepth(root.left), maxDepth(root.right))`
    },
    {
        id: 58,
        patternId: 12,
        title: "Binary Tree Level Order Traversal",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
        hint: "BFS with queue, process level by level",
        approach: "Use queue for BFS. Process all nodes at current level before moving to next.",
        complexity: "Time: O(n) | Space: O(w) where w is max width",
        keyInsight: "Track level size at start of each iteration. Process that many nodes.",
        pseudocode: `if not root: return []
result = []
queue = deque([root])
while queue:
    level = []
    for _ in range(len(queue)):
        node = queue.popleft()
        level.append(node.val)
        if node.left: queue.append(node.left)
        if node.right: queue.append(node.right)
    result.append(level)
return result`
    },
    {
        id: 59,
        patternId: 12,
        title: "Diameter of Binary Tree",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/diameter-of-binary-tree/",
        hint: "Diameter through a node = left height + right height",
        approach: "For each node, calculate left height + right height. Track maximum across all nodes.",
        complexity: "Time: O(n) | Space: O(h)",
        keyInsight: "Diameter may not pass through root. Check at every node during height calculation.",
        pseudocode: `diameter = 0
def height(node):
    global diameter
    if not node: return 0
    left = height(node.left)
    right = height(node.right)
    diameter = max(diameter, left + right)
    return 1 + max(left, right)
height(root)
return diameter`
    },
    {
        id: 60,
        patternId: 12,
        title: "Path Sum",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/path-sum/",
        hint: "Subtract node value from target, check if leaf has remaining = 0",
        approach: "DFS: subtract current value from target. At leaf, check if remaining target is 0.",
        complexity: "Time: O(n) | Space: O(h)",
        keyInsight: "Pass remaining sum down. At leaf node, check if exactly 0 remains.",
        pseudocode: `def hasPathSum(root, targetSum):
    if not root:
        return False
    if not root.left and not root.right:  # leaf
        return targetSum == root.val
    remaining = targetSum - root.val
    return hasPathSum(root.left, remaining) or hasPathSum(root.right, remaining)`
    },

    // ============================================
    // 1️⃣3️⃣ Binary Search Tree (BST)
    // ============================================
    {
        id: 61,
        patternId: 13,
        title: "Validate Binary Search Tree",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/validate-binary-search-tree/",
        hint: "Track valid range (min, max) for each node",
        approach: "Each node must be within a valid range. Update range as you traverse down.",
        complexity: "Time: O(n) | Space: O(h)",
        keyInsight: "Pass min/max bounds down. Left child: max = parent. Right child: min = parent.",
        pseudocode: `def isValid(node, minVal, maxVal):
    if not node:
        return True
    if node.val <= minVal or node.val >= maxVal:
        return False
    return isValid(node.left, minVal, node.val) and \\
           isValid(node.right, node.val, maxVal)
return isValid(root, float('-inf'), float('inf'))`
    },
    {
        id: 62,
        patternId: 13,
        title: "Lowest Common Ancestor of BST",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
        hint: "Use BST property - if both less, go left; if both greater, go right",
        approach: "If both nodes < current, LCA is in left. If both > current, LCA is in right. Otherwise, current is LCA.",
        complexity: "Time: O(h) | Space: O(1) iterative",
        keyInsight: "First node where p and q split (one left, one right) is the LCA.",
        pseudocode: `while root:
    if p.val < root.val and q.val < root.val:
        root = root.left
    elif p.val > root.val and q.val > root.val:
        root = root.right
    else:
        return root  # found split point`
    },
    {
        id: 63,
        patternId: 13,
        title: "Insert into a Binary Search Tree",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/insert-into-a-binary-search-tree/",
        hint: "Find correct leaf position using BST property",
        approach: "Traverse down: go left if val < node, right if val > node. Insert at null position.",
        complexity: "Time: O(h) | Space: O(h) recursive, O(1) iterative",
        keyInsight: "New node always becomes a leaf. Find the right spot and attach.",
        pseudocode: `def insertIntoBST(root, val):
    if not root:
        return TreeNode(val)
    if val < root.val:
        root.left = insertIntoBST(root.left, val)
    else:
        root.right = insertIntoBST(root.right, val)
    return root`
    },
    {
        id: 64,
        patternId: 13,
        title: "Kth Smallest Element in a BST",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
        hint: "Inorder traversal gives sorted order - find kth element",
        approach: "Inorder traversal visits nodes in sorted order. Count nodes until k is reached.",
        complexity: "Time: O(h + k) | Space: O(h)",
        keyInsight: "Inorder of BST = sorted array. Stop when you've seen k nodes.",
        pseudocode: `count = 0
result = None
def inorder(node):
    global count, result
    if not node or result is not None:
        return
    inorder(node.left)
    count += 1
    if count == k:
        result = node.val
        return
    inorder(node.right)
inorder(root)
return result`
    },
    {
        id: 65,
        patternId: 13,
        title: "Convert Sorted Array to BST",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/",
        hint: "Middle element becomes root, recurse on left and right halves",
        approach: "Pick middle as root for balance. Recursively build left subtree from left half, right from right half.",
        complexity: "Time: O(n) | Space: O(log n)",
        keyInsight: "Middle element as root ensures balanced tree. Divide and conquer.",
        pseudocode: `def sortedArrayToBST(nums):
    if not nums:
        return None
    mid = len(nums) // 2
    root = TreeNode(nums[mid])
    root.left = sortedArrayToBST(nums[:mid])
    root.right = sortedArrayToBST(nums[mid+1:])
    return root`
    },

    // ============================================
    // 1️⃣4️⃣ Heap / Priority Queue
    // ============================================
    {
        id: 66,
        patternId: 14,
        title: "Kth Largest Element in an Array",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
        hint: "Use min-heap of size k, or quickselect",
        approach: "Min-heap of size k: top is kth largest. Or use quickselect for O(n) average.",
        complexity: "Time: O(n log k) heap / O(n) avg quickselect | Space: O(k)",
        keyInsight: "Min-heap of size k: smallest in heap = kth largest overall.",
        pseudocode: `import heapq
# Min-heap approach
heap = []
for num in nums:
    heapq.heappush(heap, num)
    if len(heap) > k:
        heapq.heappop(heap)
return heap[0]  # kth largest`
    },
    {
        id: 67,
        patternId: 14,
        title: "Top K Frequent Elements",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/top-k-frequent-elements/",
        hint: "Count frequencies, use heap or bucket sort",
        approach: "Count frequencies. Use min-heap of size k based on frequency, or bucket sort.",
        complexity: "Time: O(n log k) heap / O(n) bucket | Space: O(n)",
        keyInsight: "Heap: keep k most frequent. Bucket sort: index by frequency.",
        pseudocode: `from collections import Counter
import heapq
count = Counter(nums)
# Min-heap by frequency
return heapq.nlargest(k, count.keys(), key=count.get)`
    },
    {
        id: 68,
        patternId: 14,
        title: "Find Median from Data Stream",
        difficulty: "Hard",
        link: "https://leetcode.com/problems/find-median-from-data-stream/",
        hint: "Two heaps: max-heap for lower half, min-heap for upper half",
        approach: "Max-heap stores smaller half, min-heap stores larger half. Balance sizes. Median from tops.",
        complexity: "Time: O(log n) add, O(1) median | Space: O(n)",
        keyInsight: "Split data into two halves. Median is average of two tops or top of larger heap.",
        pseudocode: `class MedianFinder:
    def __init__(self):
        self.small = []  # max-heap (negate values)
        self.large = []  # min-heap
    
    def addNum(self, num):
        heapq.heappush(self.small, -num)
        heapq.heappush(self.large, -heapq.heappop(self.small))
        if len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))
    
    def findMedian(self):
        if len(self.small) > len(self.large):
            return -self.small[0]
        return (-self.small[0] + self.large[0]) / 2`
    },
    {
        id: 69,
        patternId: 14,
        title: "Merge K Sorted Lists",
        difficulty: "Hard",
        link: "https://leetcode.com/problems/merge-k-sorted-lists/",
        hint: "Use min-heap to always get smallest among k heads",
        approach: "Add all list heads to min-heap. Pop smallest, add its next to heap. Repeat.",
        complexity: "Time: O(n log k) | Space: O(k)",
        keyInsight: "Heap of size k gives smallest among all list heads in O(log k).",
        pseudocode: `import heapq
heap = []
for i, lst in enumerate(lists):
    if lst:
        heapq.heappush(heap, (lst.val, i, lst))
dummy = curr = ListNode(0)
while heap:
    val, i, node = heapq.heappop(heap)
    curr.next = node
    curr = curr.next
    if node.next:
        heapq.heappush(heap, (node.next.val, i, node.next))
return dummy.next`
    },
    {
        id: 70,
        patternId: 14,
        title: "Reorganize String",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/reorganize-string/",
        hint: "Greedily place most frequent character, use max-heap",
        approach: "Use max-heap by frequency. Always place most frequent char, then put it back with reduced count.",
        complexity: "Time: O(n log 26) = O(n) | Space: O(26) = O(1)",
        keyInsight: "If most frequent char count > (n+1)/2, impossible. Use heap to alternate.",
        pseudocode: `from collections import Counter
import heapq
count = Counter(s)
maxHeap = [(-cnt, char) for char, cnt in count.items()]
heapq.heapify(maxHeap)
result = []
prev = (0, '')
while maxHeap:
    cnt, char = heapq.heappop(maxHeap)
    result.append(char)
    if prev[0] < 0:
        heapq.heappush(maxHeap, prev)
    prev = (cnt + 1, char)
return ''.join(result) if len(result) == len(s) else ""`
    },

    // ============================================
    // 1️⃣5️⃣ Graph – BFS / DFS
    // ============================================
    {
        id: 71,
        patternId: 15,
        title: "Number of Islands",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/number-of-islands/",
        hint: "DFS/BFS from each unvisited land cell, mark visited",
        approach: "For each '1' not visited, run DFS/BFS to mark entire island. Count number of DFS calls.",
        complexity: "Time: O(m × n) | Space: O(m × n) worst case",
        keyInsight: "Each DFS explores one complete island. Count = number of DFS initiations.",
        pseudocode: `def numIslands(grid):
    count = 0
    for i in range(len(grid)):
        for j in range(len(grid[0])):
            if grid[i][j] == '1':
                dfs(grid, i, j)
                count += 1
    return count

def dfs(grid, i, j):
    if i < 0 or j < 0 or i >= len(grid) or j >= len(grid[0]) or grid[i][j] != '1':
        return
    grid[i][j] = '0'  # mark visited
    dfs(grid, i+1, j); dfs(grid, i-1, j)
    dfs(grid, i, j+1); dfs(grid, i, j-1)`
    },
    {
        id: 72,
        patternId: 15,
        title: "Clone Graph",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/clone-graph/",
        hint: "Use hashmap to map original node to clone, DFS/BFS",
        approach: "Use hashmap {original: clone}. DFS/BFS traverse, create clones, connect neighbors.",
        complexity: "Time: O(V + E) | Space: O(V)",
        keyInsight: "Map old nodes to new nodes. When visiting, create clone if not exists.",
        pseudocode: `def cloneGraph(node):
    if not node: return None
    cloned = {node: Node(node.val)}
    queue = deque([node])
    while queue:
        curr = queue.popleft()
        for neighbor in curr.neighbors:
            if neighbor not in cloned:
                cloned[neighbor] = Node(neighbor.val)
                queue.append(neighbor)
            cloned[curr].neighbors.append(cloned[neighbor])
    return cloned[node]`
    },
    {
        id: 73,
        patternId: 15,
        title: "Flood Fill",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/flood-fill/",
        hint: "DFS/BFS from starting pixel, change color",
        approach: "DFS from start pixel. Change color of all connected same-color pixels.",
        complexity: "Time: O(m × n) | Space: O(m × n)",
        keyInsight: "Simple DFS. Check if pixel is original color before filling.",
        pseudocode: `def floodFill(image, sr, sc, color):
    originalColor = image[sr][sc]
    if originalColor == color: return image
    
    def dfs(r, c):
        if r < 0 or c < 0 or r >= len(image) or c >= len(image[0]):
            return
        if image[r][c] != originalColor:
            return
        image[r][c] = color
        dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)
    
    dfs(sr, sc)
    return image`
    },
    {
        id: 74,
        patternId: 15,
        title: "Keys and Rooms",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/keys-and-rooms/",
        hint: "DFS/BFS from room 0, collect keys to visit more rooms",
        approach: "Start from room 0 with its keys. BFS/DFS to visit rooms as you collect keys.",
        complexity: "Time: O(n + k) where k is total keys | Space: O(n)",
        keyInsight: "Graph traversal where keys = edges. Check if all rooms reachable.",
        pseudocode: `def canVisitAllRooms(rooms):
    visited = {0}
    stack = [0]
    while stack:
        room = stack.pop()
        for key in rooms[room]:
            if key not in visited:
                visited.add(key)
                stack.append(key)
    return len(visited) == len(rooms)`
    },
    {
        id: 75,
        patternId: 15,
        title: "Course Schedule",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/course-schedule/",
        hint: "Detect cycle in directed graph - topological sort",
        approach: "Build graph. Use DFS with 3 states (unvisited, visiting, visited) or BFS with indegree.",
        complexity: "Time: O(V + E) | Space: O(V + E)",
        keyInsight: "Cycle detection in DAG. If cycle exists, can't complete all courses.",
        pseudocode: `def canFinish(numCourses, prerequisites):
    graph = defaultdict(list)
    indegree = [0] * numCourses
    for course, prereq in prerequisites:
        graph[prereq].append(course)
        indegree[course] += 1
    
    queue = deque([i for i in range(numCourses) if indegree[i] == 0])
    count = 0
    while queue:
        node = queue.popleft()
        count += 1
        for neighbor in graph[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)
    return count == numCourses`
    },

    // ============================================
    // 1️⃣6️⃣ Graph – Shortest Path
    // ============================================
    {
        id: 76,
        patternId: 16,
        title: "Shortest Path in Binary Matrix",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/shortest-path-in-binary-matrix/",
        hint: "BFS from (0,0), 8-directional movement",
        approach: "BFS gives shortest path in unweighted graph. Move in 8 directions. Track distance.",
        complexity: "Time: O(n²) | Space: O(n²)",
        keyInsight: "BFS level = distance. First time reaching (n-1, n-1) is shortest path.",
        pseudocode: `def shortestPathBinaryMatrix(grid):
    n = len(grid)
    if grid[0][0] or grid[n-1][n-1]: return -1
    queue = deque([(0, 0, 1)])
    grid[0][0] = 1  # visited
    dirs = [(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]
    while queue:
        r, c, dist = queue.popleft()
        if r == n-1 and c == n-1: return dist
        for dr, dc in dirs:
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 0:
                grid[nr][nc] = 1
                queue.append((nr, nc, dist + 1))
    return -1`
    },
    {
        id: 77,
        patternId: 16,
        title: "Network Delay Time",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/network-delay-time/",
        hint: "Dijkstra's algorithm - find shortest path to all nodes",
        approach: "Dijkstra from source. Track min time to reach each node. Answer is max of all times.",
        complexity: "Time: O(E log V) | Space: O(V + E)",
        keyInsight: "Dijkstra finds shortest path to all nodes. Signal reaches all when slowest node reached.",
        pseudocode: `def networkDelayTime(times, n, k):
    graph = defaultdict(list)
    for u, v, w in times:
        graph[u].append((v, w))
    
    dist = {k: 0}
    heap = [(0, k)]
    while heap:
        d, node = heapq.heappop(heap)
        if d > dist.get(node, float('inf')): continue
        for neighbor, weight in graph[node]:
            newDist = d + weight
            if newDist < dist.get(neighbor, float('inf')):
                dist[neighbor] = newDist
                heapq.heappush(heap, (newDist, neighbor))
    return max(dist.values()) if len(dist) == n else -1`
    },
    {
        id: 78,
        patternId: 16,
        title: "Cheapest Flights Within K Stops",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
        hint: "Modified Dijkstra or BFS with stops constraint",
        approach: "BFS level by level (each level = 1 stop). Or Bellman-Ford with k+1 iterations.",
        complexity: "Time: O(k × E) | Space: O(V)",
        keyInsight: "Bellman-Ford: relax edges k+1 times. BFS: process level by level up to k stops.",
        pseudocode: `def findCheapestPrice(n, flights, src, dst, k):
    prices = [float('inf')] * n
    prices[src] = 0
    
    for _ in range(k + 1):
        temp = prices.copy()
        for u, v, w in flights:
            if prices[u] != float('inf'):
                temp[v] = min(temp[v], prices[u] + w)
        prices = temp
    
    return prices[dst] if prices[dst] != float('inf') else -1`
    },
    {
        id: 79,
        patternId: 16,
        title: "Path With Minimum Effort (Dijkstra)",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/path-with-minimum-effort/",
        hint: "Dijkstra where edge weight = height difference",
        approach: "Modified Dijkstra. Priority = max height difference on path so far. Minimize maximum.",
        complexity: "Time: O(m × n × log(m × n)) | Space: O(m × n)",
        keyInsight: "Edge weight = |height difference|. Minimize max edge weight on path.",
        pseudocode: `def minimumEffortPath(heights):
    m, n = len(heights), len(heights[0])
    effort = [[float('inf')] * n for _ in range(m)]
    effort[0][0] = 0
    heap = [(0, 0, 0)]  # (effort, row, col)
    
    while heap:
        e, r, c = heapq.heappop(heap)
        if r == m-1 and c == n-1: return e
        if e > effort[r][c]: continue
        for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < m and 0 <= nc < n:
                newEffort = max(e, abs(heights[nr][nc] - heights[r][c]))
                if newEffort < effort[nr][nc]:
                    effort[nr][nc] = newEffort
                    heapq.heappush(heap, (newEffort, nr, nc))
    return 0`
    },
    {
        id: 80,
        patternId: 16,
        title: "Bellman-Ford Algorithm",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
        hint: "Relax all edges V-1 times, detect negative cycles",
        approach: "Relax all edges V-1 times. Can detect negative cycles with one more iteration.",
        complexity: "Time: O(V × E) | Space: O(V)",
        keyInsight: "Works with negative edges. V-1 iterations guarantee shortest path if no negative cycle.",
        pseudocode: `def bellmanFord(n, edges, src):
    dist = [float('inf')] * n
    dist[src] = 0
    
    for _ in range(n - 1):
        for u, v, w in edges:
            if dist[u] != float('inf') and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
    
    # Check for negative cycles
    for u, v, w in edges:
        if dist[u] != float('inf') and dist[u] + w < dist[v]:
            return None  # Negative cycle exists
    return dist`
    },

    // ============================================
    // 1️⃣7️⃣ DP – 1D
    // ============================================
    {
        id: 81,
        patternId: 17,
        title: "Climbing Stairs",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/climbing-stairs/",
        hint: "dp[i] = dp[i-1] + dp[i-2] (Fibonacci pattern)",
        approach: "Ways to reach step i = ways to reach (i-1) + ways to reach (i-2). Same as Fibonacci.",
        complexity: "Time: O(n) | Space: O(1)",
        keyInsight: "From step i-1, take 1 step. From step i-2, take 2 steps. Fibonacci!",
        pseudocode: `def climbStairs(n):
    if n <= 2: return n
    prev2, prev1 = 1, 2
    for i in range(3, n + 1):
        curr = prev1 + prev2
        prev2 = prev1
        prev1 = curr
    return prev1`
    },
    {
        id: 82,
        patternId: 17,
        title: "House Robber",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/house-robber/",
        hint: "dp[i] = max(dp[i-1], dp[i-2] + nums[i])",
        approach: "At each house: skip it (keep prev max) or rob it (prev-prev max + current). Take max.",
        complexity: "Time: O(n) | Space: O(1)",
        keyInsight: "Can't rob adjacent. Either skip current or add to non-adjacent max.",
        pseudocode: `def rob(nums):
    prev2, prev1 = 0, 0
    for num in nums:
        curr = max(prev1, prev2 + num)
        prev2 = prev1
        prev1 = curr
    return prev1`
    },
    {
        id: 83,
        patternId: 17,
        title: "Maximum Subarray",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/maximum-subarray/",
        hint: "Kadane's algorithm: extend or start fresh",
        approach: "At each position: either extend previous subarray or start new. Track global max.",
        complexity: "Time: O(n) | Space: O(1)",
        keyInsight: "currentMax = max(num, currentMax + num). If extending is worse, start fresh.",
        pseudocode: `def maxSubArray(nums):
    maxSum = currentSum = nums[0]
    for num in nums[1:]:
        currentSum = max(num, currentSum + num)
        maxSum = max(maxSum, currentSum)
    return maxSum`
    },
    {
        id: 84,
        patternId: 17,
        title: "Decode Ways",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/decode-ways/",
        hint: "dp[i] = dp[i-1] (if valid single) + dp[i-2] (if valid double)",
        approach: "Check if current digit valid (1-9). Check if two digits valid (10-26). Sum ways.",
        complexity: "Time: O(n) | Space: O(1)",
        keyInsight: "Single digit: 1-9 valid. Two digits: 10-26 valid. Handle '0' carefully.",
        pseudocode: `def numDecodings(s):
    if not s or s[0] == '0': return 0
    prev2, prev1 = 1, 1
    for i in range(1, len(s)):
        curr = 0
        if s[i] != '0':
            curr = prev1
        if 10 <= int(s[i-1:i+1]) <= 26:
            curr += prev2
        prev2 = prev1
        prev1 = curr
    return prev1`
    },
    {
        id: 85,
        patternId: 17,
        title: "Coin Change",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/coin-change/",
        hint: "dp[amount] = min(dp[amount], dp[amount - coin] + 1)",
        approach: "For each amount, try all coins. dp[i] = min coins to make amount i.",
        complexity: "Time: O(amount × coins) | Space: O(amount)",
        keyInsight: "Build up from 0. For each amount, check all coins that fit.",
        pseudocode: `def coinChange(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`
    },

    // ============================================
    // 1️⃣8️⃣ DP – 2D
    // ============================================
    {
        id: 86,
        patternId: 18,
        title: "Unique Paths",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/unique-paths/",
        hint: "dp[i][j] = dp[i-1][j] + dp[i][j-1]",
        approach: "Can only come from top or left. Sum the ways. First row/col have only 1 way.",
        complexity: "Time: O(m × n) | Space: O(n) optimized",
        keyInsight: "Grid DP. Ways to cell = ways from above + ways from left.",
        pseudocode: `def uniquePaths(m, n):
    dp = [1] * n
    for i in range(1, m):
        for j in range(1, n):
            dp[j] += dp[j-1]
    return dp[n-1]`
    },
    {
        id: 87,
        patternId: 18,
        title: "Longest Common Subsequence",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/longest-common-subsequence/",
        hint: "If chars match: dp[i][j] = dp[i-1][j-1] + 1, else max of skip one char",
        approach: "2D DP. If chars match, extend LCS. If not, take max of excluding one char from either string.",
        complexity: "Time: O(m × n) | Space: O(n) optimized",
        keyInsight: "Match = diagonal + 1. No match = max(left, top).",
        pseudocode: `def longestCommonSubsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]`
    },
    {
        id: 88,
        patternId: 18,
        title: "Edit Distance",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/edit-distance/",
        hint: "Three operations: insert, delete, replace. Take min.",
        approach: "dp[i][j] = min edits to convert first i chars to first j chars. Three choices if chars differ.",
        complexity: "Time: O(m × n) | Space: O(n) optimized",
        keyInsight: "If same: dp[i-1][j-1]. Else: 1 + min(insert, delete, replace).",
        pseudocode: `def minDistance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1): dp[i][0] = i
    for j in range(n + 1): dp[0][j] = j
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
    return dp[m][n]`
    },
    {
        id: 89,
        patternId: 18,
        title: "Partition Equal Subset Sum (0/1 Knapsack)",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/partition-equal-subset-sum/",
        hint: "Can we make sum/2? Classic 0/1 knapsack DP",
        approach: "Target = sum/2. DP: can we make each sum using subset? dp[j] = can make sum j.",
        complexity: "Time: O(n × sum) | Space: O(sum)",
        keyInsight: "0/1 Knapsack: for each num, update reachable sums from high to low.",
        pseudocode: `def canPartition(nums):
    total = sum(nums)
    if total % 2: return False
    target = total // 2
    dp = [False] * (target + 1)
    dp[0] = True
    for num in nums:
        for j in range(target, num - 1, -1):
            dp[j] = dp[j] or dp[j - num]
    return dp[target]`
    },
    {
        id: 90,
        patternId: 18,
        title: "Minimum Path Sum",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/minimum-path-sum/",
        hint: "dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])",
        approach: "From each cell, min sum = current value + min of (from top, from left).",
        complexity: "Time: O(m × n) | Space: O(n) optimized",
        keyInsight: "Similar to unique paths but track sum instead of count.",
        pseudocode: `def minPathSum(grid):
    m, n = len(grid), len(grid[0])
    dp = [float('inf')] * n
    dp[0] = 0
    for i in range(m):
        for j in range(n):
            if j == 0:
                dp[j] += grid[i][j]
            else:
                dp[j] = grid[i][j] + min(dp[j], dp[j-1])
    return dp[n-1]`
    },

    // ============================================
    // 1️⃣9️⃣ Backtracking
    // ============================================
    {
        id: 91,
        patternId: 19,
        title: "Subsets",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/subsets/",
        hint: "For each element: include it or exclude it",
        approach: "Backtracking: at each position, choose to include or exclude. Or use iterative approach.",
        complexity: "Time: O(n × 2^n) | Space: O(n)",
        keyInsight: "2^n subsets. Build by including/excluding each element.",
        pseudocode: `def subsets(nums):
    result = []
    def backtrack(start, path):
        result.append(path[:])
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()
    backtrack(0, [])
    return result`
    },
    {
        id: 92,
        patternId: 19,
        title: "Permutations",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/permutations/",
        hint: "Swap each element to current position, recurse",
        approach: "For each position, try all unused elements. Track used elements or swap in place.",
        complexity: "Time: O(n × n!) | Space: O(n)",
        keyInsight: "n! permutations. Each position can have any remaining element.",
        pseudocode: `def permute(nums):
    result = []
    def backtrack(path, used):
        if len(path) == len(nums):
            result.append(path[:])
            return
        for i in range(len(nums)):
            if used[i]: continue
            used[i] = True
            path.append(nums[i])
            backtrack(path, used)
            path.pop()
            used[i] = False
    backtrack([], [False] * len(nums))
    return result`
    },
    {
        id: 93,
        patternId: 19,
        title: "Combination Sum",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/combination-sum/",
        hint: "Can reuse elements - don't increment start index after picking",
        approach: "Backtrack with remaining target. Can reuse elements (start from same index, not i+1).",
        complexity: "Time: O(n^(target/min)) | Space: O(target/min)",
        keyInsight: "Unlike subsets, can reuse. Pass same index i, not i+1.",
        pseudocode: `def combinationSum(candidates, target):
    result = []
    def backtrack(start, path, remaining):
        if remaining == 0:
            result.append(path[:])
            return
        for i in range(start, len(candidates)):
            if candidates[i] > remaining: continue
            path.append(candidates[i])
            backtrack(i, path, remaining - candidates[i])  # i, not i+1
            path.pop()
    backtrack(0, [], target)
    return result`
    },
    {
        id: 94,
        patternId: 19,
        title: "N-Queens",
        difficulty: "Hard",
        link: "https://leetcode.com/problems/n-queens/",
        hint: "Place queens row by row, check column and diagonals",
        approach: "Backtrack row by row. Track which columns and diagonals are attacked.",
        complexity: "Time: O(n!) | Space: O(n)",
        keyInsight: "One queen per row. Track: cols, diag1 (r-c), diag2 (r+c).",
        pseudocode: `def solveNQueens(n):
    result = []
    cols = set()
    diag1 = set()  # r - c
    diag2 = set()  # r + c
    board = [['.' for _ in range(n)] for _ in range(n)]
    
    def backtrack(row):
        if row == n:
            result.append([''.join(row) for row in board])
            return
        for col in range(n):
            if col in cols or row-col in diag1 or row+col in diag2:
                continue
            cols.add(col); diag1.add(row-col); diag2.add(row+col)
            board[row][col] = 'Q'
            backtrack(row + 1)
            board[row][col] = '.'
            cols.remove(col); diag1.remove(row-col); diag2.remove(row+col)
    
    backtrack(0)
    return result`
    },
    {
        id: 95,
        patternId: 19,
        title: "Letter Combinations of a Phone Number",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
        hint: "Map digits to letters, backtrack through all combinations",
        approach: "Map each digit to letters. Backtrack through all combinations of letters.",
        complexity: "Time: O(4^n × n) | Space: O(n)",
        keyInsight: "Each digit maps to 3-4 letters. Multiply possibilities.",
        pseudocode: `def letterCombinations(digits):
    if not digits: return []
    mapping = {'2':'abc','3':'def','4':'ghi','5':'jkl',
               '6':'mno','7':'pqrs','8':'tuv','9':'wxyz'}
    result = []
    
    def backtrack(idx, path):
        if idx == len(digits):
            result.append(''.join(path))
            return
        for char in mapping[digits[idx]]:
            path.append(char)
            backtrack(idx + 1, path)
            path.pop()
    
    backtrack(0, [])
    return result`
    },

    // ============================================
    // 2️⃣0️⃣ Bit Manipulation
    // ============================================
    {
        id: 96,
        patternId: 20,
        title: "Single Number",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/single-number/",
        hint: "XOR all numbers - pairs cancel out",
        approach: "XOR all numbers. a ^ a = 0, a ^ 0 = a. Pairs cancel, single remains.",
        complexity: "Time: O(n) | Space: O(1)",
        keyInsight: "XOR is commutative and associative. Duplicate pairs become 0.",
        pseudocode: `def singleNumber(nums):
    result = 0
    for num in nums:
        result ^= num
    return result`
    },
    {
        id: 97,
        patternId: 20,
        title: "Counting Bits",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/counting-bits/",
        hint: "dp[i] = dp[i >> 1] + (i & 1)",
        approach: "Number of 1s in i = number of 1s in i/2 + last bit. Or use i & (i-1) approach.",
        complexity: "Time: O(n) | Space: O(n)",
        keyInsight: "Right shift loses last bit. Add it back: dp[i] = dp[i//2] + i%2.",
        pseudocode: `def countBits(n):
    dp = [0] * (n + 1)
    for i in range(1, n + 1):
        dp[i] = dp[i >> 1] + (i & 1)
    return dp`
    },
    {
        id: 98,
        patternId: 20,
        title: "Hamming Distance",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/hamming-distance/",
        hint: "XOR then count 1s in result",
        approach: "XOR gives 1s where bits differ. Count the 1s in XOR result.",
        complexity: "Time: O(1) | Space: O(1)",
        keyInsight: "XOR highlights differences. Then count set bits.",
        pseudocode: `def hammingDistance(x, y):
    xor = x ^ y
    count = 0
    while xor:
        count += xor & 1
        xor >>= 1
    return count
# Or: return bin(x ^ y).count('1')`
    },
    {
        id: 99,
        patternId: 20,
        title: "Power of Two",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/power-of-two/",
        hint: "Power of 2 has exactly one 1-bit",
        approach: "n & (n-1) removes lowest set bit. Power of 2 has only one bit, so result is 0.",
        complexity: "Time: O(1) | Space: O(1)",
        keyInsight: "2^k has single 1-bit. n & (n-1) = 0 for powers of 2.",
        pseudocode: `def isPowerOfTwo(n):
    return n > 0 and (n & (n - 1)) == 0`
    },
    {
        id: 100,
        patternId: 20,
        title: "Subsets (Bitmask)",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/subsets/",
        hint: "Use binary numbers 0 to 2^n-1 as masks",
        approach: "Each number from 0 to 2^n-1 represents a subset. Bit i = include nums[i].",
        complexity: "Time: O(n × 2^n) | Space: O(n × 2^n)",
        keyInsight: "Iterative bitmask: number i's binary representation defines subset.",
        pseudocode: `def subsets(nums):
    n = len(nums)
    result = []
    for mask in range(1 << n):  # 0 to 2^n - 1
        subset = []
        for i in range(n):
            if mask & (1 << i):  # if bit i is set
                subset.append(nums[i])
        result.append(subset)
    return result`
    }
];
