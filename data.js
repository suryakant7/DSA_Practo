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
    { id: 10, name: "Queue / Deque" }
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
    }
];
